@extends('layouts.app')

@section('title', 'タスク一覧')

@section('content')
    <div class="header-row">
        <h1>タスク一覧</h1>
        <a href="{{ route('tasks.create') }}" class="btn btn-primary">新規タスク作成</a>
    </div>

    @if ($tasks->isEmpty())
        <p>タスクはまだありません。</p>
    @else
        <table>
            <thead>
                <tr>
                    <th>完了</th>
                    <th>タイトル</th>
                    <th>期限</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody>
                @foreach ($tasks as $task)
                    <tr>
                        <td>
                            <form class="inline" method="POST" action="{{ route('tasks.update', $task) }}">
                                @csrf
                                @method('PUT')
                                <input type="hidden" name="title" value="{{ $task->title }}">
                                <input type="hidden" name="description" value="{{ $task->description }}">
                                <input type="hidden" name="due_date" value="{{ optional($task->due_date)->format('Y-m-d') }}">
                                <input type="checkbox" onchange="this.form.submit()" name="is_done" value="1" {{ $task->is_done ? 'checked' : '' }}>
                            </form>
                        </td>
                        <td class="{{ $task->is_done ? 'done' : '' }}">
                            <a href="{{ route('tasks.show', $task) }}">{{ $task->title }}</a>
                        </td>
                        <td>{{ $task->due_date ? $task->due_date->format('Y-m-d') : '-' }}</td>
                        <td>
                            <div class="actions">
                                <a href="{{ route('tasks.edit', $task) }}" class="btn btn-secondary">編集</a>
                                <form class="inline" method="POST" action="{{ route('tasks.destroy', $task) }}" onsubmit="return confirm('削除しますか？');">
                                    @csrf
                                    @method('DELETE')
                                    <button type="submit" class="btn btn-danger">削除</button>
                                </form>
                            </div>
                        </td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    @endif
@endsection
