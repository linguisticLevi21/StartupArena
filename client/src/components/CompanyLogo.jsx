/**
 * CompanyLogo
 * 1. First tries: https://logo.clearbit.com/{domain}
 * 2. On error, loads: https://ui-avatars.com/api/?name={company name}
 *
 * onError replaces src directly — no React state needed, works on localhost.
 */
function CompanyLogo({ domain, name = "", size = 36 }) {
  const clearbitUrl = `https://logo.clearbit.com/${domain}`;
  const fallbackUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&size=64&bold=true&background=1a1a2e&color=818cf8&rounded=true&format=png`;

  return (
    <div
      style={{
        width: size,
        height: size,
        minWidth: size,
        borderRadius: 10,
        background: "rgba(255,255,255,0.04)",
        border: "1.5px solid rgba(255,255,255,0.1)",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
      title={name}
    >
      <img
        src={clearbitUrl}
        alt={name}
        width={Math.round(size * 0.75)}
        height={Math.round(size * 0.75)}
        style={{ objectFit: "contain" }}
        onError={(e) => {
          // On Clearbit failure, switch to ui-avatars (always works)
          if (!e.target.src.includes("ui-avatars")) {
            e.target.src = fallbackUrl;
          }
        }}
      />
    </div>
  );
}

export default CompanyLogo;
