#### LEAVE COMMENTS ABOVE FUNCTION TITLE. try to change it to be more descriptive.
# This is so we can track functionalities that we have already implemented.
# This is also for COT implementation later down the line.

# Get document chunks by notebook.id --> filename, order, filepath

# Get video chunks by notebook.id --> title, order, video_url

# Get text chunks by notebook.id --> title, order, text_content

# Get flashcards chunks by notebook.id --> title, order, List[flashcards] = question, options, answer, explanation

# Delete docuument chunks by  (notebook.id, order)

# Delete video chunks by  (notebook.id, order)

# Delete text chunks by (notebook.id, order)

# Delete flashcards chunks by (notebook.id, order)
# This should also delete all rows with an associated flashcard_id from the flashcard table(this is a new table, check models.py)

# Delete videos by (video_url, notebook_id, order)
# There will be multiple duplicate rows in the table with the same (video_url, notebook_id, order) but different subtitle_content and embedding
# This should include logic to update order for all chunks in the same notebook_id
# order - 1 for all chunks in the same notebook_id that come after the input order

# Update video chunk title by (notebook_id, order, new_title)
# Ensure that it is a video chunk
#       - If the order does not exist in the VideoChunk table for that notebook_id, return None or smth.

# Update text chunk title by (notebook_id, order, new_title)
# Type check, same as the video chunk

# Update document chunk title by (notebook_id, order, new_title)
# Type check, same as the video chunk

# Update flashcard chunk title by (notebook_id, order, new_title)
# Type check, same as the video chunk 