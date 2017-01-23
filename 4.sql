USE [CourseRegistration]
GO

/****** Object:  Table [dbo].[StudentsToCourses]    Script Date: 1/23/2017 1:07:43 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[StudentsToCourses](
	[StudentId] [int] NOT NULL,
	[CourseId] [int] NOT NULL,
 CONSTRAINT [PK_StudentsToCourses] PRIMARY KEY CLUSTERED 
(
	[StudentId] ASC,
	[CourseId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

ALTER TABLE [dbo].[StudentsToCourses]  WITH CHECK ADD  CONSTRAINT [FK_StudentsToCourses_Courses] FOREIGN KEY([CourseId])
REFERENCES [dbo].[Courses] ([Id])
GO

ALTER TABLE [dbo].[StudentsToCourses] CHECK CONSTRAINT [FK_StudentsToCourses_Courses]
GO

ALTER TABLE [dbo].[StudentsToCourses]  WITH CHECK ADD  CONSTRAINT [FK_StudentsToCourses_Students] FOREIGN KEY([StudentId])
REFERENCES [dbo].[Students] ([Id])
GO

ALTER TABLE [dbo].[StudentsToCourses] CHECK CONSTRAINT [FK_StudentsToCourses_Students]
GO


