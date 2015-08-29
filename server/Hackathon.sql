USE Hackathon

SET ANSI_NULL_DFLT_OFF ON -- All columns default to NOT NULL
--create schema Usr authorization dbo
--create schema Food authorization dbo
--GO

if exists (select * from sysobjects where id = object_id(N'Usr') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
DROP TABLE Usr
GO
CREATE TABLE Usr
(UsrID Int Identity(1000,1) Constraint UsrID Primary Key NONCLUSTERED
,telephoneNumber varchar(max) default ''
,Notify Int default 0
)
GO
if exists (select * from sysobjects where id = object_id(N'Food') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
DROP TABLE Food
GO
CREATE TABLE Food
(FoodID Int Identity(2000,1) Constraint FoodID Primary Key NONCLUSTERED
,FoodName varchar(max)
,RoomNumber varchar(max) default ''
,Qty Int
,latitude float
,longitude float
)
GO
INSERT INTO Usr(Notify,telephoneNumber) VALUES(1,'8284558058')
INSERT INTO Usr(Notify,telephoneNumber) VALUES(1,'8284552667')
INSERT INTO Usr(Notify,telephoneNumber) VALUES(1,'8284557283')
INSERT INTO Usr(Notify,telephoneNumber) VALUES(0,'555-555-5555')


IF EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'Usr.[get]') AND type in (N'P', N'PC'))
DROP PROC Usr.[get]
GO
CREATE PROC Usr.[get]
(@UsrID Int
) AS
SELECT UsrID,Notify
FROM Usr
WHERE UsrID=@UsrID
GO


--IF EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'Usr.WhereID') AND type in (N'P', N'PC'))
--DROP PROC Usr.WhereID
--GO
--CREATE PROC Usr.WhereID
--(@ID UniqueIdentifier
--) AS
--DECLARE @UsrID Int
--SELECT @UsrID = UsrID
--FROM Usr
--WHERE ID = @ID
--exec Usr.[get] @UsrID
--GO
IF EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'Usr.[Where]') AND type in (N'P', N'PC'))
DROP PROC Usr.[Where]
GO
CREATE PROC Usr.[Where] AS
SELECT UsrID,telephoneNumber,Notify
FROM Usr
GO


IF EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'Food.[Save]') AND type in (N'P', N'PC'))
DROP PROC Food.[Save]
GO
CREATE PROC Food.[Save]
(@FoodName varchar(max)
,@Qty Int
,@RoomNumber varchar(max)
,@Latitude float
,@Longitude float
) AS
DECLARE @FoodID Int
INSERT INTO Food(FoodName,Qty,RoomNumber,Latitude,Longitude) VALUES(@FoodName,@Qty,@RoomNumber,@Latitude,@Longitude)
SELECT @FoodID = SCOPE_IDENTITY()
exec Food.[get] @FoodID
GO



IF EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'Food.FindNow') AND type in (N'P', N'PC'))
DROP PROC Food.FindNow
GO
CREATE PROC Food.FindNow AS
select FoodID,FoodName,RoomNumber
	,CASE WHEN Qty=1 THEN 'A few '
	WHEN Qty=2 THEN 'Several '
	WHEN Qty=3 THEN 'Many '
	END AS Qty
	,Latitude
	,Longitude
FROM Food
GO


IF EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'Usr.ToggleNotify') AND type in (N'P', N'PC'))
DROP PROC Usr.ToggleNotify
GO
CREATE PROC Usr.ToggleNotify
(@telephoneNumber varchar(max)
) AS
UPDATE Usr
SET Notify = CASE WHEN Notify=1 THEN 0 ELSE 1 END
WHERE telephoneNumber = @telephoneNumber
SELECT Notify
FROM Usr
WHERE telephoneNumber = @telephoneNumber
GO


IF EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'Food.[get]') AND type in (N'P', N'PC'))
DROP PROC Food.[get]
GO
CREATE PROC Food.[get]
(@FoodID Int
) AS
SELECT FoodID,FoodName,RoomNumber
	,CASE WHEN Qty=1 THEN 'A few '
	WHEN Qty=2 THEN 'Several '
	WHEN Qty=3 THEN 'Many '
	END AS Qty
	,Latitude,Longitude
FROM Food
WHERE FoodID = @FoodID
GO

IF EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'Food.[Delete]') AND type in (N'P', N'PC'))
DROP PROC Food.[Delete]
GO
CREATE PROC Food.[Delete]
(@FoodID Int
) AS
exec Food.[get] @FoodID
DELETE FROM Food
WHERE FoodID = @FoodID
GO
exec Food.[Delete] 2001

IF EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'Food.DecrementQty') AND type in (N'P', N'PC'))
DROP PROC Food.DecrementQty
GO
CREATE PROC Food.DecrementQty
(@FoodID Int
) AS
UPDATE Food
SET Qty = Qty - 1
WHERE FoodID = @FoodID
GO

IF EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'Usr.WhereTelephoneNumber') AND type in (N'P', N'PC'))
DROP PROC Usr.WhereTelephoneNumber
GO
CREATE PROC Usr.WhereTelephoneNumber
(@telephoneNumber varchar(max)
) AS
DECLARE @UsrID Int
SELECT @UsrID = UsrID
FROM Usr
WHERE telephoneNumber = @telephoneNumber
exec Usr.[get] @UsrID
GO


select * 
from usr
select * from food

exec Food.FindNow


