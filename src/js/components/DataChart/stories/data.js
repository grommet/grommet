export const data = [];

for (let i = 0; i < 8; i += 1) {
  const v = Math.sin(i / 2.0);
  data.push({
    name: `Name ${i + 1}`,
    date: `2020-07-${((i % 30) + 1).toString().padStart(2, 0)}`,
    percent: Math.abs(v * 100),
  });
}
