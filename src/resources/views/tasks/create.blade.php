@extends('layouts.app')

@section('title', '新規タスク作成')

@section('content')
    <h1>新規タスク作成</h1>

    <form method="POST" action="{{ route('tasks.store') }}">
        @csrf

        <label for="title">タイトル</label>
        <input type="text" id="title" name="title" value="{{ old('title') }}" required>

        <label for="description">詳細</label>
        <textarea id="description" name="description" rows="4">{{ old('description') }}</textarea>

        <label for="due_date">期限</label>
        <input type="date" id="due_date" name="due_date" value="{{ old('due_date') }}">

        <div style="margin-top: 20px;">
            <button type="submit" class="btn btn-primary">作成</button>
            <a href="{{ route('tasks.index') }}" class="btn btn-secondary">キャンセル</a>
        </div>
    </form>
@endsection
