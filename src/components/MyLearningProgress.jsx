import { useEffect, useState } from "react";
import apiClient from "../api/apiClient";

// Task 13 - Activities 5, 6, 8, 9: view, update, status badge, summary cards.

// Activity 6: lets the student type completed lessons and press Update Progress.
function ProgressUpdater({ item, onUpdate }) {
  const [completed, setCompleted] = useState(String(item.completedLessons));

  const handleSubmit = (event) => {
    event.preventDefault();

    const value = Number(completed);

    if (!Number.isInteger(value) || value < 0 || value > item.totalLessons) {
      alert("Enter a valid number of completed lessons");
      return;
    }

    onUpdate(item.course._id, value, item.totalLessons);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Completed Lessons:{" "}
        <input
          type="number"
          min="0"
          max={item.totalLessons}
          step="1"
          value={completed}
          onChange={(event) => setCompleted(event.target.value)}
          required
        />
      </label>

      <button type="submit">Update Progress</button>
    </form>
  );
}

function MyLearningProgress() {
  const [progress, setProgress] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Activity 9: summary numbers
  const totalCourses = progress.length;

  const completedCourses = progress.filter(
    (item) => item.progressPercentage === 100
  ).length;

  const averageProgress =
    totalCourses > 0
      ? Math.round(
          progress.reduce((sum, item) => sum + item.progressPercentage, 0) /
            totalCourses
        )
      : 0;

  useEffect(() => {
    async function fetchProgress() {
      try {
        const response = await apiClient.get("/progress/my-progress");
        setProgress(response.data.progress || []);
      } catch (err) {
        setError("Unable to load learning progress");
      } finally {
        setLoading(false);
      }
    }

    fetchProgress();
  }, []);

  const handleUpdateProgress = async (courseId, completedLessons, totalLessons) => {
    try {
      const response = await apiClient.put("/progress", {
        courseId,
        completedLessons: Number(completedLessons),
        totalLessons: Number(totalLessons),
      });

      const updatedProgress = response.data.progress;

      setProgress((previous) =>
        previous.map((item) =>
          item.course?._id === courseId
            ? {
                ...item,
                completedLessons: updatedProgress.completedLessons,
                totalLessons: updatedProgress.totalLessons,
                progressPercentage: updatedProgress.progressPercentage,
              }
            : item
        )
      );

      alert("Learning progress updated successfully!");
    } catch (err) {
      alert(err.response?.data?.message || "Unable to update learning progress");
    }
  };

  if (loading) {
    return <p>Loading learning progress...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2>My Learning Progress</h2>

      <div
        style={{
          display: "flex",
          gap: "16px",
          flexWrap: "wrap",
          marginBottom: "24px",
        }}
      >
        <div className="summary-card">
          <h3>Total Courses</h3>
          <h2>{totalCourses}</h2>
        </div>

        <div className="summary-card">
          <h3>Completed Courses</h3>
          <h2>{completedCourses}</h2>
        </div>

        <div className="summary-card">
          <h3>Average Progress</h3>
          <h2>{averageProgress}%</h2>
        </div>
      </div>

      {progress.length === 0 ? (
        <p>No learning progress recorded yet.</p>
      ) : (
        progress.map((item) => (
          <div
            key={item._id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "16px",
              marginBottom: "16px",
            }}
          >
            <h3>{item.course?.courseName || "Course unavailable"}</h3>

            <p>
              Completed: {item.completedLessons} / {item.totalLessons} lessons
            </p>

            <progress
              value={item.progressPercentage}
              max="100"
              style={{ width: "100%" }}
            />

            <p>{item.progressPercentage}% Completed</p>

            <p>
              Status: {item.progressPercentage === 100 ? "Completed" : "In Progress"}
            </p>

            {item.course && item.progressPercentage < 100 && (
              <ProgressUpdater item={item} onUpdate={handleUpdateProgress} />
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default MyLearningProgress;