<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Stream extends Model
{
    protected $table = 'stream';

    public static function register($streamId, $streamName, $startedAt, $endedAt) {
        $stream = new Stream;
        $stream->stream_id = $streamId;
        $stream->stream_name = $streamName;
        $stream->started_at = $startedAt;
        $stream->ended_at = $endedAt;
        $stream->save();
        return $stream;
    }

    use HasFactory;
}
