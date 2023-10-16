<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class IsWeils
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if(!$request->session()->has('twitch'))
            return redirect(route('/twitch/start'));
        if($request->session()->get('twitch')->id != env('TWITCH_WEILS_UID'))
            return redirect(route('/'));

        return $next($request);
    }
}
