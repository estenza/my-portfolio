const blurLayers = [
  ['0.05859375px', '0%', '12.5%', '25%', '37.5%'],
  ['0.1171875px', '12.5%', '25%', '37.5%', '50%'],
  ['0.234375px', '25%', '37.5%', '50%', '62.5%'],
  ['0.46875px', '37.5%', '50%', '62.5%', '75%'],
  ['0.9375px', '50%', '62.5%', '75%', '87.5%'],
  ['1.875px', '62.5%', '75%', '87.5%', '100%'],
  ['3.75px', '75%', '87.5%', '100%', '112.5%'],
  ['7.5px', '87.5%', '100%', '112.5%', '125%'],
];

export default function ProgressiveHeaderBlur() {
  return (
    <div className="site-header-blur" aria-hidden="true">
      {blurLayers.map(([blur, start, middleStart, middleEnd, end]) => (
        <span
          key={blur}
          style={{
            '--blur': blur,
            '--start': start,
            '--middle-start': middleStart,
            '--middle-end': middleEnd,
            '--end': end,
          }}
        />
      ))}
    </div>
  );
}
