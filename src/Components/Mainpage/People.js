import React from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";

const People = () => {
	const Item = styled(Paper)(({ theme }) => ({
		...theme.typography.body2,
		padding: theme.spacing(1),
		textAlign: "center",
		color: theme.palette.text.secondary,
	}));

	return (
		<div>
			<Item>user: Hello</Item>
			<Item>user: Hello</Item>
			<Item>user: Hello</Item>
			<Item>user: Hello</Item>
		</div>
	);
};

export default People;
