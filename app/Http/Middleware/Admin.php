<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Models\User;
class Admin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $userCurrent = User::where('twitch_id', '=', $request->session()->get('twitch')->id)->first();
        if (!$userCurrent->hasPermissionTo('admin_access')) abort(401);
        return $next($request);
    }
}
