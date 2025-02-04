interface TimeLineItem {
  label: string;
  description: string[];
}

interface Props {
  items: TimeLineItem[];
}

function Timeline({ items }: Props) {
  return (
    <div className="p-6 sm:p-10">
      <div className="after:absolute after:inset-y-0 after:w-px after:bg-gray-500/20 relative pl-6 after:left-0 grid gap-10 dark:after:bg-gray-400/20">
        {items.map(({ description, label }, i) => (
          <div className="grid gap-1 text-sm relative" key={i}>
            <div className="aspect-square w-3 bg-gray-900 rounded-full absolute left-0 translate-x-[-29.5px] z-10 top-1 dark:bg-gray-50" />
            <div className="text-lg font-bold">{label}</div>
            <div className="text-gray-500 dark:text-gray-400">
              {description}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export { Timeline };
