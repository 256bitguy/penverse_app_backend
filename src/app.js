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


 
import userRouter from './routes/user.routes.js'

import subjectRouter from "./routes/subject.routes.js"
import chapterRouter from "./routes/chapter.routes.js"
import topicRouter from "./routes/topics.routes.js"
import questionRouter from "./routes/question.routes.js"
import Vocabulary  from "./routes/vocabulary.route.js"
import Editorials  from "./routes/editorials.routes.js"
import notes   from "./routes/notes.routes.js"
import uploadRoutes from "./routes/upload.routes.js";
import bankingawareness from "./routes/bankingAwareness.routes.js";
import dailyBankingAwareness from "./routes/dailyBankingAwareness.routes.js";
import dailyEditorial from "./routes/dailyEditorial.routes.js";
import dailyIdioms from "./routes/dailyIdioms.routes.js";
import dailyPhrasalVerbs from "./routes/dailyPhrasalVerbs.routes.js";
import dailyVocab from "./routes/dailyVocab.routes.js";
import idioms from "./routes/idioms.routes.js";
import phrasalVerb from "./routes/phrasalVerb.routes.js";
import bookRoutes from "./routes/books.routes.js"
//routes declaration
 
app.use("/api/v1/users", userRouter)
app.use("/api/v1/subjects", subjectRouter)
app.use("/api/v1/chapters", chapterRouter)
app.use("/api/v1/topics", topicRouter)
app.use("/api/v1/questions", questionRouter)
app.use("/api/v1/vocabulary", Vocabulary)
app.use("/api/v1/editorials", Editorials)
app.use("/api/v1/phrasalverb", phrasalVerb)
app.use("/api/v1/idioms", idioms)
app.use("/api/v1/notes", notes)
app.use("/api/v1/bankingawareness", bankingawareness);
app.use("/api/v1/dailyidioms", dailyIdioms);
app.use("/api/v1/dailyphrasal", dailyPhrasalVerbs);
app.use("/api/v1/dailyeditorial", dailyEditorial);
app.use("/api/v1/dailyvocab", dailyVocab);
app.use("/api/v1/dailybankingawareness", dailyBankingAwareness);
app.use("/api/v1/uploads", uploadRoutes);
app.use("/api/v1/books", bookRoutes);

export { app }