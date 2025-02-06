
import { useState } from "react";
import { Card, CardContent, Typography, Grid, Avatar, IconButton } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { useUserListsQuery } from "./Api";
import { UserType } from "./Dashboard";

const UserCartList = ({
  searchQuery,
  handleOpenEdit,
  handleDelete,
}: {
  searchQuery: string;
  handleOpenEdit: (data: UserType) => void;
  handleDelete: (id: string) => void;
}) => {
  const { data: cardData } = useUserListsQuery(0);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  console.log("searchQuery ", searchQuery);

  return (
    <Card sx={{ width: "100%", padding: 2, alignItems: "center", marginTop: 3, boxShadow: "none" }}>
      {/* <Typography variant="h5" sx={{ marginBottom: 2 }}>
        User Cart List
      </Typography> */}
      <Grid container spacing={2}>
        {cardData?.data?.map((card: any) => (
          <Grid item xs={12} margin={7} sm={6} md={4} key={card?.id}>
            <Card
              sx={{
                padding: 2,
                textAlign: "center",
                position: "relative",
                transition: "0.3s",
                "&:hover": { boxShadow: 6 },
              }}
              onMouseEnter={() => setHoveredCard(card?.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {hoveredCard === card?.id && (
                <div style={{ position: "absolute", top: 8, right: 8 }}>
                  <IconButton size="small" color="primary" onClick={() => handleOpenEdit(card)}>
                    <Edit fontSize="small" />
                  </IconButton>
                  <IconButton size="small" color="error" onClick={() => handleDelete(card.id)}>
                    <Delete fontSize="small" />
                  </IconButton>
                </div>
              )}

              <CardContent>
                <Avatar
                  src={card?.avatar}
                  alt={card?.first_name}
                  sx={{ width: 60, height: 60, margin: "auto", marginBottom: 1 }}
                />

                <Typography variant="h6">{card?.first_name}</Typography>
                <Typography color="text.secondary">{card?.email}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Card>
  );
};

export default UserCartList;
