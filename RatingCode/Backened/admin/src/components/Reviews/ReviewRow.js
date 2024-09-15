import React from "react";
import styled from "styled-components";
import { Tr, Td } from "@strapi/design-system/Table";
import { Button } from "@strapi/design-system/Button";
import { ISOToISO9075 } from "../../utils/date-format";

const ReviewRow = ({ data, onEdit, onDelete }) => {
  let contentSummary = data.comment;
  if (data.comment && data.comment.length > 25) {
    contentSummary = data.comment.slice(0, 25) + "...";
  }

  const TableRow = styled(Tr)`
    &:hover {
      cursor: pointer;
      background: #d3d3d3;
    }
  `;

  return (
    <TableRow>
      <Td>{data.id}</Td>
      <Td>{data.author.username}</Td>
      <Td>{contentSummary}</Td>
      <Td>{data.score}</Td>
      <Td>{data.related_to.id}</Td>
      <Td>{ISOToISO9075(data.createdAt)}</Td>
      <Td>
        <Button variant="danger" onClick={(e) => {
          e.stopPropagation(); // Prevent row click event
          onDelete();
        }}>
          Delete
        </Button>
        <Button variant="secondary" onClick={(e) => {
          e.stopPropagation(); // Prevent row click event
          onEdit();
        }}>
          Edit
        </Button>
      </Td>
    </TableRow>
  );
};

export default ReviewRow;
