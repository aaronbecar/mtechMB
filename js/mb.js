$(document).ready(function() {

    var topPost = ["BestTeacherDude","Trying to decide a career path? Programming is the move. Change my mind."];
    var comments = [["someguy", "I don't think i will try."],["AnotherDude", "I will make you change your mind.  There's nothing better!"],["teacherPet", "I'm the teachers pet!"],["classClown", "I'm the class clown. HA HA HA HA HA!"]]
    
    console.log("Page Ready!");

    // Display the Top Post Info
    displayPost(topPost[0],topPost[1]);
    
    // Load Comments
    reloadComments();


    //Clicked New Comment Button
    $("#addNewCommentButton").click(function(){
        console.log("New comment button pressed.");
        addNewComment($("#displayNameTextBox").val(),$("#newCommentTextBox").val())
    });     

    //Overload a Links
    $("#commentsContainer").on("click","a",function(e){
        console.log("Link: " + $(this).attr('id'));
        console.log("ID: " +e.target.id);
        var elementInfo = e.target.id.split("_");
        var aAction = elementInfo[0];
        var aKey = elementInfo[1];

        // Confirm Action
        if (aAction == "delete"){
            deleteComment(aKey);
        }
        if (aAction == "edit"){
            editComment(aKey);
        }

    });

    $(document).on("click",".saveChange",function(e){
        console.log("Link: " + $(this).attr('id'));
        console.log("ID: " +e.target.id);
        var elementInfo = e.target.id.split("_");
        var aAction = elementInfo[0];
        var aKey = elementInfo[1];
        if(aAction == "saveChange"){
            console.log("Saving Change: " + aKey);
            console.log("Old Value: " + comments[aKey][1]);
            newValue = $("#newCommentText_"+aKey).val();
            console.log("New Value: " + newValue);
            comments[aKey][1]=newValue;
        }
        reloadComments();
    });


    // Display Top Post
    function displayPost(pName,pText){
        console.log("Display top post...");
        $("#topPostDisplayName").text(pName);
        $("#topPostText").text(pText);
        console.log("Done with top post!");
    }

    // Add the new comment
    function addNewComment(dName,cText){
        console.log("Adding new comment: ");
        console.log("Name: " + dName);
        console.log("Comment: " + cText);

        //Add new comment to the array at the begining
        comments.unshift([dName,cText]);
        reloadComments();
    }

    // Delete Comment
    function deleteComment(commentID){
        console.log("Deleting element: " + commentID);
        newArray = $.grep(comments, function(n,i){
            console.log("N: " + n + " I: " + i);
            return (i != commentID);
        });
        comments = newArray;
        reloadComments();
    }


    // Edit Comment
    function editComment(kid){
        console.log("Editing Comment: " + kid);
        modHTML="<input type=\"text\" id=\"newCommentText_" + kid + "\" size=\"80\"> <input id=\"saveChange_" + kid +"\" type=\"submit\" class=\"saveChange\" value=\"Save\">"
        $("#comment_"+kid).html(modHTML);
        $("#newCommentText_"+kid).val(comments[kid][1]);
    }

    // Redraw the comments
    function reloadComments(){
        console.log("Showing new comments!");
        newHTML = "";
        $.each(comments,function(key,value){
            console.log("Comment:" + key);
            newHTML = newHTML + "<div id=box_" + key + "\" class=\"commentBox\"><div class=\"commentBoxComment\"><ui><li id=\"name_" + key + "\" class=\"commentName\">" + comments[key][0] + "</li></ui><ul><li id=\"comment_" + key + "\" class=\"commentText\">" + comments[key][1] + "</li></div><div class=\"commentBoxMod\"><p class=\"modText\"><a id=\"edit_" + key + "\" href=\"#\">EDIT</a> | <a id=\"delete_"+key+"\" href=\"#\">DELETE</a></p></div></div>";
        });
        //console.log("New HTML: " + newHTML);
        $("#commentsContainer").html(newHTML);

    }

});