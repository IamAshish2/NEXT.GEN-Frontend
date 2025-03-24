export const options = [
    {
      "id": "save",
      "label": "Save Post",
      "icon": "bookmark",
      "action": "savePost"
    },
    {
      "id": "share",
      "label": "Share Post",
      "icon": "share",
      "action": "sharePost",
      "submenu": [
        {
          "id": "shareToPlatform",
          "label": "Share to Platform",
          "action": "shareToPlatform"
        },
        {
          "id": "copyLink",
          "label": "Copy Link",
          "action": "copyLink"
        },
        {
          "id": "sendDM",
          "label": "Send Direct Message",
          "action": "sendDM"
        }
      ]
    },
    {
      "id": "report",
      "label": "Report Post",
      "icon": "flag",
      "action": "reportPost"
    },
    {
      "id": "mute",
      "label": "Mute Notifications",
      "icon": "notifications_off",
      "action": "muteNotifications"
    },
    {
      "id": "follow",
      "label": "Follow Author",
      "icon": "person_add",
      "action": "followAuthor"
    },
    {
      "id": "translate",
      "label": "Translate Post",
      "icon": "translate",
      "action": "translatePost"
    },
    {
      "id": "download",
      "label": "Download Media",
      "icon": "download",
      "action": "downloadMedia"
    }
  ]