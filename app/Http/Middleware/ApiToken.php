<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ApiToken
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if(!$request->hasHeader('Authorization'))
            return response()->json(['state' => 'Unauthorized'], 401);

        $apiToken = $request->header('Authorization');
        if ($apiToken != 'Bearer '.config('weils.apiKey')) {
            return response()->json(['state' => 'Unauthorized'], 401);
        }

        return $next($request);
    }
}
