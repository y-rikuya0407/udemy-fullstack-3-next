@extends('layouts.app')

@section('title', $task->title)

@section('content')
    <div class="header-row">
        <h1>{{ $task->title }}</h1>
        <span>{{ $task->is_done ? '✅ 完了' : '⏳ 未完了' }}</span>
    </div>

    <p><strong>期限:</strong> {{ $task->due_date ? $task->due_date->format('Y-m-d') : '未設定' }}</p>
    <p><strong>詳細:</strong></p>
    <p>{{ $task->description ?: '（詳細なし）' }}</p>

    <div style="margin-top: 20px;">
        <a href="{{ route('tasks.edit', $task) }}" class="btn btn-secondary">編集</a>
        <a href="{{ route('tasks.index') }}" class="btn btn-secondary">一覧へ戻る</a>
    </div>
@endsection
