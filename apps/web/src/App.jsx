import { useEffect, useMemo, useState } from "react";
import "./App.css";

const CITIES = [
  "Москва",
  "Санкт-Петербург",
  "Самара",
  "Казань",
  "Екатеринбург",
  "Новосибирск",
  "Нижний Новгород",
  "Краснодар",
  "Воронеж",
  "Другой",
];

function getTg() {
  return window.Telegram?.WebApp;
}

function Pill({ active, children, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        border: "1px solid rgba(255,255,255,0.14)",
        background: active ? "rgba(255,255,255,0.16)" : "rgba(0,0,0,0.25)",
        color: "rgba(255,255,255,0.92)",
        padding: "10px 12px",
        borderRadius: 14,
        fontSize: 14,
        lineHeight: "14px",
        cursor: "pointer",
        textAlign: "left",
      }}
    >
      {children}
    </button>
  );
}

function Card({ title, subtitle, children }) {
  return (
    <div
      style={{
        background: "rgba(0,0,0,0.35)",
        border: "1px solid rgba(255,255,255,0.10)",
        borderRadius: 22,
        padding: 16,
        boxShadow: "0 20px 60px rgba(0,0,0,0.35)",
        backdropFilter: "blur(10px)",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
        <div>
          <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: 0.2 }}>
            {title}
          </div>
          {subtitle ? (
            <div
              style={{
                marginTop: 6,
                color: "rgba(255,255,255,0.7)",
                fontSize: 13,
              }}
            >
              {subtitle}
            </div>
          ) : null}
        </div>
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 14,
            border: "1px solid rgba(255,255,255,0.12)",
            background: "rgba(255,255,255,0.08)",
            display: "grid",
            placeItems: "center",
            fontWeight: 800,
            letterSpacing: 0.5,
          }}
          title="damdam"
        >
          dd
        </div>
      </div>

      <div style={{ marginTop: 14 }}>{children}</div>
    </div>
  );
}

function PrimaryButton({ disabled, children, onClick }) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      style={{
        width: "100%",
        border: "1px solid rgba(255,255,255,0.14)",
        background: disabled ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.16)",
        color: disabled ? "rgba(255,255,255,0.45)" : "rgba(255,255,255,0.92)",
        padding: "14px 14px",
        borderRadius: 18,
        fontSize: 15,
        fontWeight: 700,
        cursor: disabled ? "not-allowed" : "pointer",
      }}
    >
      {children}
    </button>
  );
}

function SmallText({ children }) {
  return <div style={{ color: "rgba(255,255,255,0.65)", fontSize: 12 }}>{children}</div>;
}

export default function App() {
  const tg = useMemo(() => getTg(), []);

  // ✅ ВАЖНО: это JS-часть (можно объявлять const)
  const tgUser = tg?.initDataUnsafe?.user;
  const handle = tgUser?.username ? `@${tgUser.username}` : null;
  const who = handle || (tgUser?.first_name ? tgUser.first_name : "гость");

  const [step, setStep] = useState("age"); // age -> city -> lounge
  const [ageOk, setAgeOk] = useState(false);
  const [city, setCity] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    tg?.ready?.();
    tg?.expand?.();
  }, [tg]);

  const filteredCities = useMemo(() => {
    const s = search.trim().toLowerCase();
    if (!s) return CITIES;
    return CITIES.filter((c) => c.toLowerCase().includes(s));
  }, [search]);

  return (
    <div
      style={{
        minHeight: "100vh",
        color: "white",
        background:
          "radial-gradient(1200px 600px at 20% 10%, rgba(255,180,80,0.25), transparent 60%)," +
          "radial-gradient(900px 500px at 80% 30%, rgba(120,210,255,0.18), transparent 55%)," +
          "radial-gradient(800px 700px at 50% 100%, rgba(160,120,255,0.18), transparent 60%)," +
          "linear-gradient(180deg, #0b0b10 0%, #07070b 100%)",
        padding: 16,
        boxSizing: "border-box",
      }}
    >
      <div style={{ maxWidth: 520, margin: "0 auto", paddingTop: 8, paddingBottom: 28 }}>
        {step === "age" && (
          <Card title="damdam" subtitle="только 18+. тупо место для знакомств.">
            <div style={{ display: "grid", gap: 10 }}>
              <div
                style={{
                  border: "1px dashed rgba(255,255,255,0.18)",
                  borderRadius: 18,
                  padding: 12,
                  background: "rgba(0,0,0,0.2)",
                }}
              >
                <div style={{ fontWeight: 700, marginBottom: 6 }}>правило</div>
                <SmallText>совпадение открывает ник. никаких чатов внутри. звезды решают.</SmallText>
              </div>

              <Pill active={ageOk} onClick={() => setAgeOk((v) => !v)}>
                {ageOk ? "✅ мне есть 18" : "мне есть 18"}
              </Pill>

              <PrimaryButton disabled={!ageOk} onClick={() => setStep("city")}>
                продолжить
              </PrimaryButton>

              <SmallText>если тебе нет 18 — закрой приложение.</SmallText>
            </div>
          </Card>
        )}

        {step === "city" && (
          <Card title="город" subtitle="чтобы показывать людей рядом.">
            <div style={{ display: "grid", gap: 10 }}>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="поиск города…"
                style={{
                  width: "100%",
                  padding: "12px 12px",
                  borderRadius: 16,
                  border: "1px solid rgba(255,255,255,0.14)",
                  background: "rgba(0,0,0,0.30)",
                  color: "rgba(255,255,255,0.92)",
                  outline: "none",
                }}
              />

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                {filteredCities.map((c) => (
                  <Pill key={c} active={city === c} onClick={() => setCity(c)}>
                    {c}
                  </Pill>
                ))}
              </div>

              <PrimaryButton disabled={!city} onClick={() => setStep("lounge")}>
                в диванчик
              </PrimaryButton>

              <SmallText>город можно будет поменять в профиле.</SmallText>
            </div>
          </Card>
        )}

        {step === "lounge" && (
          <Card title="диванчик" subtitle={`город: ${city || "—"} • ты: ${who}`}>
            <div style={{ display: "grid", gap: 12 }}>
              <div
                style={{
                  borderRadius: 18,
                  border: "1px solid rgba(255,255,255,0.10)",
                  background: "rgba(255,255,255,0.06)",
                  padding: 12,
                }}
              >
                <div style={{ fontWeight: 800, marginBottom: 6 }}>механика</div>
                <SmallText>
                  ⭐ отправляешь звезду — это интерес. если в ответ прилетит ⭐ — вы совпали, откроется ник.
                </SmallText>
              </div>

              <div
                style={{
                  borderRadius: 22,
                  border: "1px solid rgba(255,255,255,0.10)",
                  background: "rgba(0,0,0,0.25)",
                  padding: 14,
                  display: "grid",
                  gap: 8,
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                  <div>
                    <div style={{ fontSize: 18, fontWeight: 800 }}>профиль-заглушка</div>
                    <SmallText>пока без данных. дальше подключим ленту.</SmallText>
                  </div>
                  <div style={{ fontSize: 28, lineHeight: "28px" }}>🛋️</div>
                </div>

                <PrimaryButton onClick={() => alert("⭐ позже подключим оплату")}>
                  отправить ⭐ (пока демо)
                </PrimaryButton>

                <div style={{ display: "flex", gap: 10 }}>
                  <Pill active={false} onClick={() => setStep("city")}>
                    сменить город
                  </Pill>
                  <Pill active={false} onClick={() => setStep("age")}>
                    назад
                  </Pill>
                </div>
              </div>
            </div>
          </Card>
        )}

        <div
          style={{
            marginTop: 14,
            textAlign: "center",
            color: "rgba(255,255,255,0.35)",
            fontSize: 12,
          }}
        >
          damdam • stars only
        </div>
      </div>
    </div>
  );
}
