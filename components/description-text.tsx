interface Props {
  children: React.ReactNode;
}

export default function DescriptionText({ children }: Props) {
  return (
    <p className="text-sm leading-relaxed text-muted-foreground">
      {children}
    </p>
  );
}