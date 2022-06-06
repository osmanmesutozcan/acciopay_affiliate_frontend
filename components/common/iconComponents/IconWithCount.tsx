import { styled } from "@mui/material/styles";
import { Badge, BadgeProps } from "@mui/material";

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: 5,
    height: 12,
    width: 7,
    fontSize: 8,
    padding: 0,
  },
}));

export function IconWithCount({ className, count, Icon }: { className: string; count: number; Icon: any }) {
    if (!count) {
        <Icon className={className} />
    }

  return (
    <StyledBadge
      badgeContent={count}
      color="primary"
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
    >
      <Icon className={className} />
    </StyledBadge>
  );
}
