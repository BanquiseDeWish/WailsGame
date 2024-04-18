<?php

namespace App\Http\Controllers;

use App\Models\QMQuestionsCommunity;
use App\Models\QuizzMasterHistory;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Storage;
use getID3;
use Illuminate\Validation\Rules\Unique;
use Illuminate\Support\Str;

class QuizzMasterController extends Controller
{

    public function index()
    {
        return Inertia::render('Tools/Quizz/Index', []);
    }

    public function party($gameId)
    {
        return Inertia::render('Tools/Quizz/Quizz', ['gameId' => $gameId]);
    }

    public function form()
    {
        return Inertia::render('Tools/Quizz/QuizzForm', []);
    }

    function assetPictureMIME($mime) {
        $mimeList = ['image/png', 'image/jpg', 'image/jpeg', 'image/webp'];
        return in_array($mime, $mimeList);
    }

    function assetSoundMIME($mime) {
        $mimeList = ['audio/mpeg', 'audio/ogg', 'audio/weba'];
        return in_array($mime, $mimeList);
    }

    public function send_question(Request $request) {
        $user = $request->session()->get('twitch');
        $validator = Validator::make($request->all(), [
            'sentence' => 'required|max:150',
            'type' => [
                'required',
                Rule::in(['text', 'sound', 'picture']),
            ],
        ]);
        $file = $request->file('dropzone_file');

        if ($validator->fails()) {
            return redirect(route('games.quizz.form'))->withErrors($validator);
        }

        //Check proposal
        $resultat = array_filter($request->input('proposal'), function($v, $k) {
            return $v['text'] == "";
        }, ARRAY_FILTER_USE_BOTH);


        if(count($resultat) > 0) {
            $validator->errors()->add(
                'proposal', 'Un ou plusieurs propositions semblent vides.'
            );
            return redirect(route('games.quizz.form'))->withErrors($validator);
        }

        $typeQuestion = $request->input('type');

        $uuid = Str::uuid();

        if($typeQuestion !== "text" && $file == null) {
            $validator->errors()->add(
                'file', 'Vous devez fournir un asset avant de poster une question de ce type.'
            );
            return redirect(route('games.quizz.form'))->withErrors($validator);
        }else if($typeQuestion !== "text" && $file !== null) {
            //Check MIME Asset
            $checkMIME = $typeQuestion == "picture" ? $this->assetPictureMIME($file->getMimeType()) : $this->assetSoundMIME($file->getMimeType());
            if(!$checkMIME) {
                $validator->errors()->add(
                    'file', 'Ce fichier n\'est pas au bon format, veuillez vous reporter à la DargZone pour savoir le type pris en charge.'
                );
                return redirect(route('games.quizz.form'))->withErrors($validator);
            }

            //Check Size File
            $sizeFile = $request->file('dropzone_file')->getSize();
            number_format(($sizeFile / pow(1024, 2)), 2);
        }

        $file->storeAs('quizz/form', $uuid . '.' . $file->extension(), 'public');

        //Check file sound
        if($typeQuestion == "sound") {
            $fullAudioPath = storage_path('app\public\quizz\form\\' . $uuid . '.' . $file->extension());
            if (file_exists($fullAudioPath)) {
                // Initialiser la classe getID3
                $getID3 = new getID3();

                // Analyser le fichier audio
                $audioFileInfo = $getID3->analyze($fullAudioPath);

                // Obtenir la durée du fichier audio
                $audioDuration = $audioFileInfo['playtime_seconds'];

                if((int) $audioDuration > 10) {
                    $validator->errors()->add(
                        'file', 'Le fichier audio ne doit pas être supérieur à 10 secondes.'
                    );
                    return redirect(route('games.quizz.form'))->withErrors($validator);
                }
            }
        }

        $splitCategoryTheme = explode("-", $request->input('themeSelect'));
        QMQuestionsCommunity::insert([
            'user_id' => $user->id,
            'sentence' => $request->input('sentence'),
            'type' => $typeQuestion,
            'category_key' => $splitCategoryTheme[0],
            'theme_key' => $splitCategoryTheme[1],
            'uuid' => $uuid,
            'proposal' => json_encode($request->input('proposal')),
            'created_at' => now()
        ]);

        $proposal = $request->input('proposal');
        $fields = [];
        foreach ($proposal as $k => $propos) {
            array_push($fields, [
                "name" => $k == 0 ? "Bonne réponse" : "Autre réponse",
                "value" => $propos['text'],
                "inline" => true
            ]);
        }

        if($typeQuestion !== "text") {
            array_push($fields, [
                "name" => "Fichier attaché à la question",
                "value" => env('APP_URL') . '/storage/quizz/form/' . $uuid . '.' . $file->extension(),
                "inline" => true
            ]);
        }

        $timestamp = date("c", strtotime("now"));
        $msg = json_encode([
            "content" => null,
            "embeds" => [
                [
                    "title" => "Nouvelle question postée - QuizzMaster",
                    "description" => "**Intitulé de la question:**\n" . $request->input('sentence') . "\n**Type:**\n" . $request->input('type') . "\n**Catégorie:**\n" . $splitCategoryTheme[0]  . " - " . $splitCategoryTheme[1] . "\n**Auteur de la question:**\n*SunshineDev*",
                    "color" => 5814783,
                    "fields" => $fields,
                    "footer"  => [
                        "text" => "QuizzMaster - Banquise de Weils",
                        "icon_url" => "https://banquisedeweils.fr/build/assets/logo-cbd387c8.png"
                    ],
                    "timestamp" => $timestamp
                ]
            ],
            "attachments" => []
        ], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE );

        $this->discordmsg($msg, 'https://discord.com/api/webhooks/1230206654025302119/hGMU7KHRMvs36ytfcIQZlq29XctrQ6yAFc2v_apRcFOQ4xnEH34PfUIge0AZbHDHPBe-');

        return redirect(route('games.quizz.form'))->withErrors($validator);
    }

    public function discordmsg($msg, $webhook) {
        if($webhook != "") {
            $ch = curl_init( $webhook );
            curl_setopt( $ch, CURLOPT_HTTPHEADER, array('Content-type: application/json'));
            curl_setopt( $ch, CURLOPT_POST, 1);
            curl_setopt( $ch, CURLOPT_POSTFIELDS, $msg);
            curl_setopt( $ch, CURLOPT_FOLLOWLOCATION, 1);
            curl_setopt( $ch, CURLOPT_HEADER, 0);
            curl_setopt( $ch, CURLOPT_RETURNTRANSFER, 1);

            $response = curl_exec( $ch );
            // If you need to debug, or find out why you can't send message uncomment line below, and execute script.
            echo $response;
            curl_close( $ch );
        }
    }

    /*public function registerHistory(Request $request) {
        $inputs = $request->all();
        $idParty = $inputs['id_party'];
        $playerLeader = $inputs['player_leader'];
        $dataParty = $inputs['data_party'];

        QuizzMasterHistory::insert([
            "uuid" => $idParty,
            "user_leader_id" => $playerLeader,
            "data_party" => $dataParty
        ]);
    }*/

}
