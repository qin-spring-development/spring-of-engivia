# エンジビアの泉

- 💻 環境構築
  プロダクト開発を始めるに当たってローカル環境とプロダクション環境の環境構築方法を書いています。

- 🌿 git ブランチ運用のルール
  ブランチにおける役割、ブランチ名の命名ルールが書かれています。
  また、git moji の使用方法について記載しています。

- 📕 コーディングガイドライン
  開発に当たって全体で共有したいルールを書いています。

- 🎨 デザインガイドライン
  デザインを進めるにあたって、共有したいルールを書いています。

- 👩‍👩‍👧 チーム開発ガイドライン
  チーム開発を進めるにあたって、共有したいルールを書いています。
  - プルリクエスト作成はできるだけテンプレートに添いましょう。（全てを埋め切らなくても大丈夫です）
    書く内容は[こちら](https://applis.io/posts/how-to-write-git-pull-request)を参考にしてみてください 🙇

## 💻 環境構築

---

### **パッケージマネージャーの準備**

まずはパッケージマネージャーが用意されているかの確認をお願いします。

ターミナルで`npm -v`のコマンドを入力して表示されたら 1 の手順は OK です！

これ以降の手順は npm で記載しています。yarn を使う人は定義読み替えて実行してください。

npm がインストールされていない場合は node.js なども一緒にインストールをお願いします！

方法は`homebrew`や`nodebrew`が初心者には主流ですが、
ディレクトリにごとのバージョン切り替えに不便なので Volta なり nodenv を使用して進めましょう。

### **VScode の拡張機能の準備**

- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

- [Prittier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

上記の拡張機能の使いをお願いします！このプロジェクト内ではファイルの保存時＆コミットの際にフォーマットが走るように設定をしています。

### リポジトリから clone

このリポジトリをローカル環境に clone をしてください！
※ このプロジェクトでは develop ブランチを更新して作業用ブランチを切り、
完了後マージする運用の為、main ブランチは clone しなくて OK です。

```
// 特定のブランチを指定してcloneするコマンド
git clone -b develop git@github.com:qin-spring-development/spring-of-engivia.git
```

### パッケージインストール

vscode 上でターミナルを開き、ディレクトリ直下と functions で 2 つで、`yarn install`のコマンドを実行してください。
プロジェクトに必要なモジュールと、それに依存関係のあるものがインストールされます！
インストール後は`node_modules`フォルダに格納されます。

## 🌿 git ブランチ運用のルール

`main`

- 本番のブランチです。ここにマージすると本番に自動反映されます。基本的にはこのブランチでは作業はしません。

`develop`

- 本番反映前に確認するための環境（ステージング環境）。
- 常駐しているブランチで作業ブランチからの変更を受けつけ、ここから main にマージします。

`hotfix`

- 本番で発生した緊急のバグに対する対処をするためのブランチ。
- 必ず main から分岐し、main と develop にマージする。

`feature/[対応するチケット番号]-[作業の概要]`

- 開発にはここを用いる。
- 必ず develop から分岐し、develop にマージする。
- [対応するチケット番号]には JIRA 上で対応するチケットの番号(例: EGI-5 など)を入力。
- [作業の概要]は作業内容を簡単に記載(例: new-order-function)
- 例: EGI-5-new-order-function

`main`, `develop`, `hotfix` に直接 push してはいけません。基本的に作業は`[対応するチケット番号]-[作業の概要]` ブランチだけで行います。

### gitmoji について

**GitMoji とは？**
git のコミットメッセージに絵文字を使うことでコミットの内容をわかりやすくするものです！
必須ではありませんが[拡張機能](https://gitmoji.dev/)のインストール、もしくはターミナルより以下のコマンドでインストール
しておくことをお勧めします。

```
npm install -g gitmoji
```

#### GitMoji のルール(よく使うもの)

- 初めてのコミット（Initial Commit） :🎉:
- バージョンタグ（Version Tag） :🔖:
- 新機能（New Feature） :✨:
- バグ修正（Bugfix） :🐛:
- リファクタリング(Refactoring) :♻️:
- ドキュメント（Documentation） :📚:
- デザイン UI/UX(Accessibility) :🎨:
- パフォーマンス（Performance） :🏇:
- ツール（Tooling） :🔧:
- テスト（Tests） :🚨:
- 非推奨追加（Deprecation） :💩:
- 削除（Removal） :🗑:
- WIP(Work In Progress) :🚧:

## 📕 コーディングガイドライン

- context (グローバルステート)
  グローバルステイトは原則多用しないようにしたいと思います。理由は無闇に関心のある状態を複数持つのは無意味に深いネストの原因になるからです。できる限り 4 階層くらいまではローカルで管理をします。

- 関数はどこに書くか
  関数の記述箇所はその関数が関心を持つモジュールに書いていくようにします。あまり関数に関係のないモジュールに書くとリファクタリング、コードレビューの際に読解などが困難になるからです。

（例）

- Layout コンポーネントに firebase 新規顧客を追加するボタンの関数をかく => NG..
- 新規顧客登録のコンポーネントに新規顧客情報を追加する処理の関数をかく => OK!

- ピクセルなどの指定
  px などでの細かい指定はせず Tailwind の md, sm,などの固定の値を使って指定をお願いします。

- export
  Components ディレクトリ内でコンポーネントを export する際は default export を避け named export を使用してください。
  ただし pages 配下は default export しか使えないためこの限りではありません。

## 🎨 4.デザインガイドライン

これから決めまーす。

## 👩‍👩‍👧 チーム開発ガイドライン

短期決戦のため、基本的に毎日夜 21:00 からミーティング実施しています。
できれば参加していただきたいです！
