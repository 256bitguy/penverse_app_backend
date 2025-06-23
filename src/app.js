import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())


//routes import
import userRouter from './routes/user.routes.js'
// import healthcheckRouter from "./routes/healthcheck.routes.js"
import subjectRouter from "./routes/subject.routes.js"
import chapterRouter from "./routes/chapter.routes.js"
import topicRouter from "./routes/topics.routes.js"
import questionRouter from "./routes/question.routes.js"
import Vocabulary  from "./routes/vocabulary.route.js"
// import likeRouter from "./routes/like.routes.js"
// import playlistRouter from "./routes/playlist.routes.js"
// import dashboardRouter from "./routes/dashboard.routes.js"

//routes declaration
// app.use("/api/v1/healthcheck", healthcheckRouter)
app.use("/api/v1/users", userRouter)
app.use("/api/v1/subjects", subjectRouter)
app.use("/api/v1/chapters", chapterRouter)
app.use("/api/v1/topics", topicRouter)
app.use("/api/v1/questions", questionRouter)
app.use("/api/v1/vocabulary", Vocabulary)
// app.use("/api/v1/likes", likeRouter)
// app.use("/api/v1/playlist", playlistRouter)
// app.use("/api/v1/dashboard", dashboardRouter)

// http://localhost:8000/api/v1/users/register

export { app }