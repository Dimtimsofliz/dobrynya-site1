import Link from "next/link";

export const metadata = {
  title: "Спасибо! Ваша заявка отправлена",
};

export default function ThanksPage() {
  return (
    <main className="container-page py-16 text-center">
      <h1 className="text-3xl font-bold mb-3">Спасибо!</h1>
      <p className="opacity-80">Мы свяжемся с вами в ближайшее время.</p>
      <Link href="/" className="btn btn-primary mt-6 inline-block">На главную</Link>
    </main>
  );
}
