type Props = {
  titleText: string;
};

export const PlainTitle = ({ titleText }: Props): JSX.Element => (
  <div className="font-semibold text-xl text-left w-full">{titleText}</div>
);
