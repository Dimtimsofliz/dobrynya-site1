import Link from "next/link";

export default function NotFound() {
  return (
    <main className="container-page py-20 text-center">
      <h1 className="text-3xl font-bold mb-3">Страница не найдена</h1>
      <p className="opacity-80">Проверьте адрес или вернитесь на главную.</p>
      <Link href="/" className="btn btn-primary mt-6 inline-block">На главную</Link>
    </main>
  );
}
