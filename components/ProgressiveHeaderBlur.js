const blurLayers = [
  ['0.5px', '0%', '18%'],
  ['1px', '12%', '20%'],
  ['2px', '30%', '20%'],
  ['4px', '48%', '20%'],
  ['8px', '66%', '34%'],
];

export default function ProgressiveHeaderBlur() {
  return (
    <div className="site-header-blur" aria-hidden="true">
      {blurLayers.map(([blur, top, height]) => (
        <span
          key={blur}
          style={{
            '--blur': blur,
            '--top': top,
            '--height': height,
          }}
        />
      ))}
    </div>
  );
}
