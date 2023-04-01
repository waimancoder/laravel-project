<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;


class ApiAuthController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email|max:255|unique:users',
            'fullname' => 'required|string|max:255',
            'phone_no' => 'required|string|max:255',
            'role' => 'required|string|max:255|in:student,staff,outsider',
            'password' => 'required|string|min:6',
        ]);
        if ($validator->fails()) {
            return response([
                'status' => false,
                'status_code' => 422,
                'errors' => $validator->errors()->all()
            ], 422);
        }
        $request['password'] = Hash::make($request['password']);
        $request['remember_token'] = Str::random(10);
        $request['id'] = Str::uuid();
        $user = User::create($request->toArray());
        $token = $user->createToken('Laravel Password Grant Client')->plainTextToken;
        $response = [
            'user' => $user,
            'token' => $token
        ];
        return response([
            'status' => true,
            'status_code' => 200,
            'data' => $response
        ], 200);
    }

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email|max:255',
            'password' => 'required|string|min:6|confirmed',
        ]);
        if ($validator->fails()) {
            return response(['errors' => $validator->errors()->all()], 422);
        }
        $user = User::where('email', $request->email)->first();
        if ($user) {
            if (Hash::check($request->password, $user->password)) {
                $token = $user->createToken('Laravel Password Grant Client')->plainTextToken;
                $response = ['token' => $token];
                return response($response, 200);
            } else {
                $response = ["message" => "Password mismatch"];
                return response($response, 422);
            }
        } else {
            $response = ["message" => 'User does not exist'];
            return response($response, 422);
        }
    }

    public function logout(Request $request)
    {
        Auth::user()->tokens()->where('id', Auth::user()->currentAccessToken()->id)->delete();
        return response()->json([
            'status' => 'success',
            'message' => 'Logout successful.'
        ]);
    }
}
