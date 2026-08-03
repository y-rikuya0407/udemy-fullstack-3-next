<?php

use App\Http\Controllers\TaskController;
use Illuminate\Support\Facades\Route;

Route::redirect('/', '/tasks');

Route::resource('tasks', TaskController::class);

Route::view('/tasks-api', 'tasks.api')->name('tasks.api');
