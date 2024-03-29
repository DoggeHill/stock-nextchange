<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Facades\Validator;
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
        $validator = Validator::make(['id' => $id], [
            'id' => 'required|numeric'
        ]);

        if ($validator->fails())
            abort(404);
            
        return User::find($id);
    }

    public function findByEmail(Request $request)
    {
        return User::where('email', $request->email) -> first();
    }

}