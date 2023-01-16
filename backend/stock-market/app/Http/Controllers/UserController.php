<?php

namespace App\Http\Controllers;

use App\Models\Item;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{

    public function test()
    {
        return "TEST PASSED";
    }

    public function list()
    {
        return User::all();
    }

    public function findById($id)
    {
        return User::find($id);
    }

}