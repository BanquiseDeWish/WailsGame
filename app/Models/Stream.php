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

    public static function fromStreamId($streamId) {
        return Stream::where('stream_id', $streamId)->first();
    }

    public static function registerOrUpdate($streamId, $streamName, $startedAt, $endedAt) {
        $stream = Stream::fromStreamId($streamId);
        if($stream == null) {
            $stream = Stream::register($streamId, $streamName, $startedAt, $endedAt);
        } else {
            $stream->stream_name = $streamName;
            $stream->started_at = $startedAt;
            $stream->ended_at = $endedAt;
            $stream->save();
        }
        return $stream;
    }

    use HasFactory;
}
