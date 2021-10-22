# Firebase CLI の設定

ここでは、Firebase CLI の設定方法を説明します。

Firebase CLI の設定とは、Firestore Security Rules や Cloud Functions などの編集・デプロイなどを、[Firebase Console](https://console.firebase.google.com/) ではなく、ローカルで行えるようにするための設定です。

## Firebase CLI の有効化

Firebase CLI の有効化を行います。まずは、Firebase にログインします。

```
# firebase login
```

認証用の URL がターミナルに現れます。自動でブラウザは開かないので、手動でその URL をブラウザにコピーしてアクセスし、認証を済ませて下さい。

次のコマンドを実行すると、現在ログインしている Firebase アカウントでアクセス可能なプロジェクト一覧が表示されます。

```
firebase projects:list
```

## Firestore rules のデプロイ

firebase ディレクトリに移動し、以下のコマンドを実行します。

```
firebase deploy --only firestore:rules
```

firestore の rules をデプロイすることができます。
