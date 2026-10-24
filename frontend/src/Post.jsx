import { useEffect, useState } from "react";
import Popup from "./Popup";
import "./Post.css";

const emptyForm = {
  title: "",
  description: "",
  abstract: "",
  articleText: "",
  tags: "",
};

// "java, react ,  css" -> ["java", "react", "css"]
function parseTags(text) {
  return text
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
}

// Returns an object like { title: "message", tags: "message" } - empty object = valid
function validate(postType, form) {
  const errors = {};
  const title = form.title.trim();

  if (title.length < 5) errors.title = "Title must be at least 5 characters.";
  else if (title.length > 120)
    errors.title = "Title must be 120 characters or fewer.";

  if (postType === "question") {
    if (form.description.trim().length < 20)
      errors.description = "Please describe your problem in at least 20 characters.";
  } else {
    const abstract = form.abstract.trim();
    if (abstract.length < 20)
      errors.abstract = "Abstract must be at least 20 characters.";
    else if (abstract.length > 500)
      errors.abstract = "Abstract must be 500 characters or fewer.";

    if (form.articleText.trim().length < 100)
      errors.articleText = "Article text must be at least 100 characters.";
  }

  const tags = parseTags(form.tags);
  if (tags.length === 0) errors.tags = "Please add at least one tag.";
  else if (tags.length > 3) errors.tags = "You can add up to 3 tags.";
  else if (tags.some((tag) => !/^[\w+#.-]{1,20}$/.test(tag)))
    errors.tags =
      "Each tag can use letters, numbers, + # . - and be up to 20 characters.";

  return errors;
}

export default function Post() {
  const [postType, setPostType] = useState("question"); // "question" | "article"
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [popup, setPopup] = useState(null); // { type: "success" | "error", message }

  // Hook: clear old error messages whenever the user switches post type
  useEffect(() => {
    setErrors({});
  }, [postType]);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();

    const found = validate(postType, form);
    setErrors(found);

    if (Object.keys(found).length > 0) {
      setPopup({
        type: "error",
        message: "Your post could not be sent. Please fix the highlighted fields.",
      });
      return;
    }

    // Saving the post (e.g. to Firestore) will be added in a future task.
    setPopup({ type: "success", message: `Your ${postType} has been sent!` });
    setForm(emptyForm);
  };

  const isQuestion = postType === "question";

  return (
    <div className="post-page">
      <form className="post-card" onSubmit={handleSubmit} noValidate>
        <h2 className="post-bar">New Post</h2>

        <div className="post-type">
          <span>Select Post Type:</span>
          <label>
            <input
              type="radio"
              name="postType"
              value="question"
              checked={isQuestion}
              onChange={() => setPostType("question")}
            />
            Question
          </label>
          <label>
            <input
              type="radio"
              name="postType"
              value="article"
              checked={!isQuestion}
              onChange={() => setPostType("article")}
            />
            Article
          </label>
        </div>

        <h3 className="post-bar post-bar-sub">What do you want to ask or share</h3>

        <label className="post-row" htmlFor="title">
          <span>Title</span>
          <input
            id="title"
            name="title"
            type="text"
            value={form.title}
            onChange={handleChange}
            placeholder={
              isQuestion
                ? "Start your question with how, what, why, etc."
                : "Enter a descriptive title"
            }
          />
        </label>
        {errors.title && <p className="post-error">{errors.title}</p>}

        {/* Conditional rendering: different fields depending on the selected type */}
        {isQuestion ? (
          <>
            <label className="post-label" htmlFor="description">
              Describe your problem
            </label>
            <textarea
              id="description"
              name="description"
              className="post-textarea post-textarea-large"
              value={form.description}
              onChange={handleChange}
            />
            {errors.description && (
              <p className="post-error">{errors.description}</p>
            )}
          </>
        ) : (
          <>
            <label className="post-label" htmlFor="abstract">
              Abstract
            </label>
            <textarea
              id="abstract"
              name="abstract"
              className="post-textarea post-textarea-small"
              placeholder="Enter a 1-paragraph abstract"
              value={form.abstract}
              onChange={handleChange}
            />
            {errors.abstract && <p className="post-error">{errors.abstract}</p>}

            <label className="post-label" htmlFor="articleText">
              Article Text
            </label>
            <textarea
              id="articleText"
              name="articleText"
              className="post-textarea post-textarea-large"
              placeholder="Write your article here"
              value={form.articleText}
              onChange={handleChange}
            />
            {errors.articleText && (
              <p className="post-error">{errors.articleText}</p>
            )}
          </>
        )}

        <label className="post-row" htmlFor="tags">
          <span>Tags</span>
          <input
            id="tags"
            name="tags"
            type="text"
            value={form.tags}
            onChange={handleChange}
            placeholder={`Please add up to 3 tags (separated by commas) to describe what your ${postType} is about e.g., Java`}
          />
        </label>
        {errors.tags && <p className="post-error">{errors.tags}</p>}

        <div className="post-actions">
          <button type="submit" className="post-button">
            Post
          </button>
        </div>
      </form>

      {popup && (
        <Popup
          type={popup.type}
          message={popup.message}
          onClose={() => setPopup(null)}
        />
      )}
    </div>
  );
}
