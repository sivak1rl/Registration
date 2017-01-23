USE [CourseRegistration]
GO

/****** Object:  Table [dbo].[Courses]    Script Date: 1/23/2017 1:07:16 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Courses](
	[CourseId] [varchar](20) NOT NULL,
	[Title] [varchar](100) NOT NULL,
	[Credits] [varchar](15) NOT NULL,
	[Description] [varchar](max) NOT NULL,
	[Capacity] [int] NOT NULL,
	[Id] [int] IDENTITY(1,1) NOT NULL,
 CONSTRAINT [PK_Courses] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO


