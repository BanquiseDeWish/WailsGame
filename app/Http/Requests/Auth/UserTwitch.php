<?php

namespace App\Http\Requests\Auth;

use Illuminate\Contracts\Auth\Authenticatable;

class UserTwitch implements Authenticatable
{

    public $id;
     // Assurez-vous que votre classe contient les propriétés nécessaires comme l'identifiant, le nom d'utilisateur, le mot de passe, etc.

    // Implémentez les méthodes de l'interface Authenticatable

    public function getAuthIdentifierName()
    {
        return 'id'; // Nom de la colonne de l'identifiant dans votre table de base de données
    }

    public function getAuthIdentifier()
    {
        return $this->id; // Renvoie l'identifiant de l'utilisateur
    }

    public function getAuthPassword()
    {
        return ""; // Renvoie le mot de passe de l'utilisateur
    }

    public function getRememberToken()
    {
        // Si votre application prend en charge "remember me" functionality
        return "";
    }

    public function setRememberToken($value)
    {
        // Si votre application prend en charge "remember me" functionality
        //$this->remember_token = $value;
    }

    public function getRememberTokenName()
    {
        // Si votre application prend en charge "remember me" functionality,
        // renvoie le nom de la colonne de remember token dans votre table de base de données
        return 'remember_token';
    }
}
