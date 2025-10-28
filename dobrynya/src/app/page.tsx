"use client";
import Image from "next/image";
import { useMemo, useState } from "react";

type MaterialKey =
  | "Металлокассеты"
  | "Композит (АКП)"
  | "HPL панели"
  | "Керамогранит/плитка/клинкер"
  | "Клинкер"
  | "Профнастил"
  | "Краспан"
  | "Камень (натур/искусственный)"
  | "Дерево / WPC"
  | "ПВХ-панели"
  | "Сэндвич-панели";

const pricingMap: Record<MaterialKey, number> = {
  "Металлокассеты": 2590,
  "Композит (АКП)": 3890,
  "HPL панели": 3490,
  "Керамогранит/плитка/клинкер": 2290,
  "Клинкер": 2790,
  "Профнастил": 1790,
  "Краспан": 2800,
  "Камень (натур/искусственный)": 3500,
  "Дерево / WPC": 2400,
  "ПВХ-панели": 1600,
  "Сэндвич-панели": 2400,
};

function rub(n: number) {
  return n.toLocaleString("ru-RU", { style: "currency", currency: "RUB", maximumFractionDigits: 0 });
}

export default function Home() {
  const [material, setMaterial] = useState<MaterialKey>("Металлокассеты");
  const [area, setArea] = useState<number>(100);
  const [layers, setLayers] = useState<1 | 2>(1);
  const [thickness, setThickness] = useState<50 | 100>(50);

  const basePrice = pricingMap[material];

  const pricePerM2 = useMemo(() => {
    let price = basePrice;
    if (layers === 2) price *= 1.2; // +20% при 2 слоях
    if (thickness === 100) price *= 1.1; // +10% при 100 мм
    return Math.round(price);
  }, [basePrice, layers, thickness]);

  const total = useMemo(() => Math.round(pricePerM2 * area), [pricePerM2, area]);

  const shareText = encodeURIComponent(
    `Заявка на расчёт фасада\nМатериал: ${material}\nПлощадь: ${area} м²\nСлои утепления: ${layers}\nТолщина: ${thickness} мм\nЦена: ${rub(total)}`
  );

  return (
    <main id="home" className="container-page">
      {/* Hero */}
      <section className="grid md:grid-cols-2 gap-8 py-12 items-center">
        <div>
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">
            Вентилируемые фасады под ключ
          </h1>
          <p className="mt-4 text-lg opacity-85">
            Москва и МО, выезд инженера — 24 часа. Расчёт сметы и подбор материалов под ваш проект.
          </p>
          <div className="mt-6 flex gap-3">
            <a href="#calc" className="btn btn-primary">Рассчитать стоимость</a>
            <a href="tel:+74957778899" className="btn btn-outline">Позвонить</a>
          </div>
        </div>
        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden card">
          <Image src="/img/hero.png" alt="Современный фасад" fill className="object-cover" priority />
        </div>
      </section>

      {/* Материалы */}
      <section id="materials" className="py-12">
        <h2 className="text-2xl font-bold mb-6">Материалы</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(pricingMap).map(([name, price]) => (
            <button
              key={name}
              onClick={() => setMaterial(name as MaterialKey)}
              className={`card p-4 text-left transition outline-offset-2 focus-visible:outline ${
                material === name ? "ring-2 ring-[var(--brand-gold)]" : "hover:translate-y-[-2px]"
              }`}
              aria-pressed={material === name}
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="font-semibold">{name}</div>
                  <div className="text-sm opacity-70">Ориентировочно: {rub(price)}/м²</div>
                </div>
                <span className="inline-flex items-center rounded-full bg-[var(--brand-gold)] text-[var(--foreground)] text-xs font-bold px-2 py-1">
                  от {rub(price)}
                </span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Преимущества и доверие */}
      <section id="benefits" className="py-12 grid md:grid-cols-2 gap-6">
        <div className="card p-6">
          <h3 className="font-bold text-lg mb-2">Наши преимущества</h3>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li>Собственные бригады и инженерный контроль</li>
            <li>Чистые швы и скрытый крепёж</li>
            <li>Работаем по договору и смете</li>
            <li>Гарантия и сервисное обслуживание</li>
          </ul>
        </div>
        <div className="card p-6">
          <h3 className="font-bold text-lg mb-2">Почему нам доверяют</h3>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li>Опыт в коммерческих и частных проектах</li>
            <li>Сроки под ключ без простоев</li>
            <li>Прозрачная смета и закупки</li>
            <li>Рекомендуют клиенты</li>
          </ul>
        </div>
      </section>

      {/* Галерея */}
      <section id="projects" className="py-12">
        <h2 className="text-2xl font-bold mb-6">Наши объекты</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 9 }).map((_, i) => (
            <figure key={i} className="card overflow-hidden">
              <div className="relative aspect-[4/3]">
                <Image
                  src={`/img/53709429844865171${String(1 + i).padStart(2, "0")}.jpg`}
                  alt={`Объект ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  loading="lazy"
                />
              </div>
              <figcaption className="p-3 text-sm opacity-80">Современный фасад — объект #{i + 1}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Отзывы */}
      <section id="reviews" className="py-12">
        <h2 className="text-2xl font-bold mb-4">Отзывы</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {["Отличная команда, сроки соблюдены", "Качественно, рекомендую"].map((t, i) => (
            <blockquote key={i} className="card p-4 text-sm">
              <p>“{t}”</p>
              <footer className="opacity-70 mt-2">— Клиент</footer>
            </blockquote>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-12">
        <h2 className="text-2xl font-bold mb-4">FAQ</h2>
        <details className="card p-4 mb-3">
          <summary className="font-semibold cursor-pointer">Сколько занимает монтаж?</summary>
          <p className="mt-2 text-sm opacity-80">В среднем 2–6 недель в зависимости от площади и материала.</p>
        </details>
        <details className="card p-4">
          <summary className="font-semibold cursor-pointer">Какие гарантии?</summary>
          <p className="mt-2 text-sm opacity-80">Гарантия по договору, сервисное обслуживание по заявке.</p>
        </details>
      </section>

      {/* Калькулятор/Заявка */}
      <section id="calc" className="py-12">
        <h2 className="text-2xl font-bold mb-4">Калькулятор стоимости</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="card p-4">
            <label className="block text-sm mb-1">Материал</label>
            <select
              className="w-full p-2 rounded-md border border-black/10 bg-white"
              value={material}
              onChange={(e) => setMaterial(e.target.value as MaterialKey)}
              aria-label="Выбор материала"
            >
              {Object.keys(pricingMap).map((k) => (
                <option key={k} value={k}>
                  {k}
                </option>
              ))}
            </select>

            <label className="block text-sm mt-4 mb-1">Площадь (м²)</label>
            <input
              type="number"
              min={10}
              step={1}
              value={area}
              onChange={(e) => setArea(Math.max(0, Number(e.target.value)))}
              className="w-full p-2 rounded-md border border-black/10"
              aria-label="Площадь в квадратных метрах"
            />

            <div className="grid grid-cols-2 gap-3 mt-4">
              <div>
                <label className="block text-sm mb-1">Слои утепления</label>
                <select
                  value={layers}
                  onChange={(e) => setLayers(Number(e.target.value) as 1 | 2)}
                  className="w-full p-2 rounded-md border border-black/10"
                  aria-label="Слои утепления"
                >
                  <option value={1}>1 слой</option>
                  <option value={2}>2 слоя (+20%)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm mb-1">Толщина</label>
                <select
                  value={thickness}
                  onChange={(e) => setThickness(Number(e.target.value) as 50 | 100)}
                  className="w-full p-2 rounded-md border border-black/10"
                  aria-label="Толщина утеплителя"
                >
                  <option value={50}>50 мм</option>
                  <option value={100}>100 мм (+10%)</option>
                </select>
              </div>
            </div>
          </div>

          <div className="card p-4 flex flex-col gap-3">
            <div className="text-sm opacity-70">Цена за м²</div>
            <div className="text-3xl font-extrabold">{rub(pricePerM2)}</div>
            <div className="text-sm opacity-70">Итого</div>
            <div className="text-3xl font-extrabold">{rub(total)}</div>
            <div className="text-xs opacity-70">
              Цены ориентировочные (работа + подсистема), итог зависит от проекта.
            </div>
          </div>
        </div>

        {/* Форма заявки + шаринг */}
        <div className="card p-4 mt-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const data = new FormData(e.currentTarget as HTMLFormElement);
              const message = `Заявка на расчёт фасада\nИмя: ${data.get("name")}\nТелефон: ${data.get("phone")}\nПлощадь: ${area} м²\nМатериал: ${material}\nСлои: ${layers}\nТолщина: ${thickness} мм\nКомментарий: ${data.get("comment") || "-"}`;
              const href = `https://wa.me/?text=${encodeURIComponent(message)}`;
              window.open(href, "_blank");
            }}
            className="grid sm:grid-cols-2 gap-3"
            aria-label="Форма заявки"
          >
            <div className="sm:col-span-1">
              <label className="block text-sm mb-1" htmlFor="name">Имя</label>
              <input id="name" name="name" required className="w-full p-2 rounded-md border border-black/10" placeholder="Как к вам обращаться" />
            </div>
            <div className="sm:col-span-1">
              <label className="block text-sm mb-1" htmlFor="phone">Телефон</label>
              <input type="tel" id="phone" name="phone" required pattern="^\+7\s?\(?\d{3}\)?\s?\d{3}\-?\d{2}\-?\d{2}$" placeholder="+7 (___) ___-__-__" className="w-full p-2 rounded-md border border-black/10" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm mb-1" htmlFor="comment">Комментарий</label>
              <textarea id="comment" name="comment" rows={3} className="w-full p-2 rounded-md border border-black/10" placeholder="Коротко опишите задачу" />
            </div>

            <div className="sm:col-span-2 flex flex-wrap gap-2 mt-2">
              <button className="btn btn-primary" type="submit">Отправить в WhatsApp</button>
              <a
                className="btn btn-outline"
                href={`https://t.me/share/url?url=${encodeURIComponent("https://dobrynya-stroy.online")}&text=${shareText}`}
                target="_blank"
                rel="noopener noreferrer"
              >Отправить в Telegram</a>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
