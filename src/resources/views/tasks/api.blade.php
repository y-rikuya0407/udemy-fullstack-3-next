@extends('layouts.app')

@section('title', 'タスク一覧(API版)')

@section('content')
    <div class="header-row">
        <h1>タスク一覧(API版)</h1>
    </div>

    <p style="color:#666; font-size: 14px;">
        このページは <code>/api/tasks</code> をaxiosで呼び出し、ページ遷移なしにCRUDを行います。
    </p>

    <form id="task-form" style="margin-bottom: 24px;">
        <h2 id="form-heading" style="font-size: 16px; margin: 0;">新規タスク作成</h2>

        <label for="title">タイトル</label>
        <input type="text" id="title" name="title" required>

        <label for="description">詳細</label>
        <textarea id="description" name="description" rows="3"></textarea>

        <label for="due_date">期限</label>
        <input type="date" id="due_date" name="due_date">

        <div id="form-errors" class="errors" style="display:none; margin-top: 12px;"></div>

        <div style="margin-top: 16px;">
            <button type="submit" id="form-submit" class="btn btn-primary">作成</button>
            <button type="button" id="form-cancel" class="btn btn-secondary" style="display:none;">キャンセル</button>
        </div>
    </form>

    <div id="task-app">
        <p>読み込み中...</p>
    </div>
@endsection

@push('scripts')
    @vite(['resources/js/tasks-api.js'])
@endpush
