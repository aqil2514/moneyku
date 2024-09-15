export default function AssetsSkeleton() {
  return (
    <div className="main-page">
      <h1 className="font-playfair-bold title-page">Aset</h1>

      <div id="asset-menu" style={{ margin: "1rem 0" }}>
        <div className="skeleton skeleton-button"></div>
      </div>

      <div id="asset-container">
        <div className="skeleton skeleton-div"></div>
        <div className="skeleton skeleton-div"></div>
        <div className="skeleton skeleton-div"></div>
      </div>
    </div>
  );
}
