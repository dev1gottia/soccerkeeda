interface MatchStatBarProps {
  label: string;
  team1Label: string;
  team2Label: string;
  team1Value: number;
  team2Value: number;
  team1Color: string; // e.g. "#FF0000"
  team2Color: string; // e.g. "#0000FF"
}

export default function MatchStatBar({
  label,
  team1Label,
  team2Label,
  team1Value,
  team2Value,
  team1Color,
  team2Color,
}: MatchStatBarProps) {
  const total = team1Value + team2Value || 1; // Avoid divide by 0
  const team1Percent = (team1Value / total) * 100;
  const team2Percent = (team2Value / total) * 100;

  return (
    <div className="w-full space-y-1 my-4">
      {/* Labels and values */}
      <div className="flex justify-between text-sm text-muted-foreground">
        <span className="w-1/4 text-left">{team1Value}</span>
        <span className="w-1/2 text-center text-foreground font-medium">
          {label}
        </span>
        <span className="w-1/4 text-right">{team2Value}</span>
      </div>

      {/* Progress bar */}
      <div className="flex h-3 w-full overflow-hidden rounded-full border">
        <div
          className="h-full"
          style={{
            width: `${team1Percent}%`,
            backgroundColor: team1Color,
          }}
        />
        <div
          className="h-full"
          style={{
            width: `${team2Percent}%`,
            backgroundColor: team2Color,
          }}
        />
      </div>
    </div>
  );
}
