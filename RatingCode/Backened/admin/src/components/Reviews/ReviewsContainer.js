import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Table, Thead, Tbody, Tr, Td, Th } from "@strapi/design-system/Table";
import { ModalLayout, ModalHeader, ModalBody, ModalFooter } from "@strapi/design-system/ModalLayout";
import { Stack } from "@strapi/design-system/Stack";
import { Textarea } from "@strapi/design-system/Textarea";
import { Button } from "@strapi/design-system/Button";
import { Typography } from "@strapi/design-system/Typography";
import { Box } from "@strapi/design-system/Box";
import ReactStarsRating from "react-awesome-stars-rating";
import axios from "../../utils/axiosInstance";
import { ISOToISO9075 } from "../../utils/date-format";
import ReviewRow from "./ReviewRow";

const ReviewsContainer = ({ data, actionDelete, actionAdd }) => {
  const [reviews, setReviews] = useState([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);

  useEffect(() => {
    if (data) {
      const reviewsJSX = data.reviews.map((review) => (
        <ReviewRow
          data={review}
          key={review.id}
          onEdit={() => {
            setSelectedReview(review);
            setEditModalOpen(true);
          }}
          onDelete={() => {
            setSelectedReview(review);
            setDeleteModalOpen(true);
          }}
        />
      ));
      setReviews(reviewsJSX);
    }
  }, [data]);

  const loadMore = async () => {
    const start = data.reviews.length;
    const url = `/ratings?start=${start}&ignoreCount=1`;
    try {
      const res = await axios.get(url);
      const { reviews } = res.data;
      actionAdd(reviews);
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = async (editedReview) => {
    const url = `/ratings/reviews/${editedReview.id}`;
    try {
      const res = await axios.put(url, editedReview);
      const { ok } = res.data;
      if (!ok) {
        throw res;
      }
      actionDelete(selectedReview.id); // Remove old review from parent list
      actionAdd([editedReview]); // Add updated review to parent list
      setEditModalOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async () => {
    const url = `/ratings/reviews/${selectedReview.id}`;
    try {
      const res = await axios.delete(url);
      const { ok } = res.data;
      if (!ok) {
        throw res;
      }
      actionDelete(selectedReview.id);
      setDeleteModalOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {!data.reviews || !data.reviews.length ? (
        <Typography variant="beta">There are no reviews yet</Typography>
      ) : (
        <Stack size={2}>
          <Typography variant="beta">
            Viewing {data.reviews.length} of {data.reviewsCount} reviews
          </Typography>
          <Table colCount={6} rowCount={data.reviews.length}>
            <Thead>
              <Tr>
                <Th><Typography fontWeight="bold">ID</Typography></Th>
                <Th><Typography fontWeight="bold">Author</Typography></Th>
                <Th><Typography fontWeight="bold">Comment</Typography></Th>
                <Th><Typography fontWeight="bold">Score</Typography></Th>
                <Th><Typography fontWeight="bold">Content ID</Typography></Th>
                <Th><Typography fontWeight="bold">Date</Typography></Th>
                <Th><Typography fontWeight="bold">Actions</Typography></Th>
              </Tr>
            </Thead>
            <Tbody>{reviews}</Tbody>
          </Table>
          {data.reviews.length < data.reviewsCount && (
            <Button variant="secondary" onClick={loadMore}>
              Load more reviews
            </Button>
          )}
        </Stack>
      )}
      {editModalOpen && selectedReview && (
        <ModalLayout labelledBy="edit-title" onClose={() => setEditModalOpen(false)}>
          <ModalHeader>
            <Typography fontWeight="bold" textColor="neutral800" as="h2" id="edit-title">
              Edit review {selectedReview.id}
            </Typography>
          </ModalHeader>
          <ModalBody>
            <Box paddingBottom={6}>
              <Typography variant="beta">Edit the review details</Typography>
              <Stack size={4}>
                <Textarea
                  value={selectedReview.comment}
                  onChange={(e) => setSelectedReview({ ...selectedReview, comment: e.target.value })}
                  placeholder="Enter your comment"
                />
                <ReactStarsRating
                  isEdit={true}
                  value={selectedReview.score}
                  onChange={(value) => setSelectedReview({ ...selectedReview, score: value })}
                />
              </Stack>
            </Box>
          </ModalBody>
          <ModalFooter
            startActions={<Button onClick={() => setEditModalOpen(false)}>Cancel</Button>}
            endActions={<Button variant="secondary" onClick={() => handleEdit(selectedReview)}>Save changes</Button>}
          />
        </ModalLayout>
      )}
      {deleteModalOpen && selectedReview && (
        <ModalLayout labelledBy="delete-title" onClose={() => setDeleteModalOpen(false)}>
          <ModalHeader>
            <Typography fontWeight="bold" textColor="neutral800" as="h2" id="delete-title">
              Delete review {selectedReview.id} and associated score
            </Typography>
          </ModalHeader>
          <ModalBody>
            <Box paddingBottom={6}>
              <Typography variant="beta">
                Are you sure you want to delete this review and associated score?
              </Typography>
              <Typography textColor="neutral800" as="h5">
                This action cannot be undone
              </Typography>
            </Box>
            <Stack horizontal size={4}>
              <Button onClick={() => setDeleteModalOpen(false)}>Back</Button>
              <Button
                variant="danger"
                onClick={handleDelete}
              >
                Delete
              </Button>
            </Stack>
          </ModalBody>
        </ModalLayout>
      )}
    </>
  );
};
const ReviewModal = ({ data, close, actionDelete, actionEdit }) => {
  const [editedComment, setEditedComment] = React.useState(data.comment);
  const [editedScore, setEditedScore] = React.useState(data.score);

  return (
    <ModalLayout labelledBy="modal-title" onClose={close}>
      <ModalHeader>
        <Typography fontWeight="bold" textColor="neutral800" as="h2" id="modal-title">
          Review {data.id}
        </Typography>
      </ModalHeader>
      <ModalBody>
        <Box paddingBottom={6}>
          <Typography variant="beta">Review Details</Typography>
          <Textarea
            value={editedComment}
            onChange={(e) => setEditedComment(e.target.value)}
            placeholder="Enter your comment"
          />
          <ReactStarsRating
            isEdit={true}
            value={editedScore}
            onChange={(value) => setEditedScore(value)}
          />
        </Box>
      </ModalBody>
      <ModalFooter
        startActions={<Button onClick={close}>Cancel</Button>}
        endActions={
          <>
            <Button onClick={() => actionEdit({ ...data, comment: editedComment, score: editedScore })}>
              Save Changes
            </Button>
            <Button variant="danger" onClick={actionDelete}>
              Delete
            </Button>
          </>
        }
      />
    </ModalLayout>
  );
};

export default ReviewsContainer;