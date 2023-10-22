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
            return response()->json(['state' => 'Bearer Token not specified'], 401);

        $apiToken = $request->header('Authorization');
        if ($apiToken != 'Bearer ' . env('API_KEY')) {
            return response()->json(['state' => 'Unauthorized'], 401);
        }

        return $next($request);
    }
}
