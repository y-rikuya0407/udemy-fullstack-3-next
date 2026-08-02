<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@yield('title', 'タスク管理アプリ')</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Hiragino Sans", sans-serif;
            background: #f5f5f5;
            color: #333;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 720px;
            margin: 0 auto;
            padding: 24px 16px;
        }
        h1 {
            font-size: 24px;
        }
        .status {
            background: #e6f7e6;
            border: 1px solid #b6e3b6;
            color: #2a6b2a;
            padding: 10px 14px;
            border-radius: 6px;
            margin-bottom: 16px;
        }
        .errors {
            background: #fdecea;
            border: 1px solid #f5c2c0;
            color: #a33;
            padding: 10px 14px;
            border-radius: 6px;
            margin-bottom: 16px;
        }
        .btn {
            display: inline-block;
            padding: 6px 14px;
            border-radius: 4px;
            text-decoration: none;
            font-size: 14px;
            border: none;
            cursor: pointer;
        }
        .btn-primary { background: #3b82f6; color: #fff; }
        .btn-secondary { background: #e5e7eb; color: #333; }
        .btn-danger { background: #ef4444; color: #fff; }
        table {
            width: 100%;
            border-collapse: collapse;
            background: #fff;
            border-radius: 6px;
            overflow: hidden;
        }
        th, td {
            padding: 10px 12px;
            border-bottom: 1px solid #eee;
            text-align: left;
            vertical-align: middle;
        }
        th { background: #fafafa; }
        .done { text-decoration: line-through; color: #999; }
        form.inline { display: inline; }
        .actions { display: flex; gap: 6px; }
        label { display: block; margin-top: 12px; margin-bottom: 4px; font-weight: bold; }
        input[type=text], input[type=date], textarea {
            width: 100%;
            box-sizing: border-box;
            padding: 8px;
            border: 1px solid #ccc;
            border-radius: 4px;
        }
        .header-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 16px;
        }
    </style>
</head>
<body>
    <div class="container">
        @if (session('status'))
            <div class="status">{{ session('status') }}</div>
        @endif

        @if ($errors->any())
            <div class="errors">
                <ul style="margin:0; padding-left: 18px;">
                    @foreach ($errors->all() as $error)
                        <li>{{ $error }}</li>
                    @endforeach
                </ul>
            </div>
        @endif

        @yield('content')
    </div>
</body>
</html>
