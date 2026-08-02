@extends('layouts.app')

@section('title', 'タスク編集')

@section('content')
    <h1>タスク編集</h1>

    <form method="POST" action="{{ route('tasks.update', $task) }}">
        @csrf
        @method('PUT')

        <label for="title">タイトル</label>
        <input type="text" id="title" name="title" value="{{ old('title', $task->title) }}" required>

        <label for="description">詳細</label>
        <textarea id="description" name="description" rows="4">{{ old('description', $task->description) }}</textarea>

        <label for="due_date">期限</label>
        <input type="date" id="due_date" name="due_date" value="{{ old('due_date', optional($task->due_date)->format('Y-m-d')) }}">

        <label style="display:flex; align-items:center; gap:6px; margin-top: 12px;">
            <input type="checkbox" name="is_done" value="1" {{ old('is_done', $task->is_done) ? 'checked' : '' }}>
            完了済み
        </label>

        <div style="margin-top: 20px;">
            <button type="submit" class="btn btn-primary">更新</button>
            <a href="{{ route('tasks.index') }}" class="btn btn-secondary">キャンセル</a>
        </div>
    </form>
@endsection
