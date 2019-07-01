
function addNotification(sender, recipients, action, contentId, onModel, description) {
    var notificationService = new (require('../services/NotificationService'))();
    var data = ({
        sender: sender,
        recipients: recipients,
        action: action,
        contentId: contentId,
        onModel: onModel,
        description: description
    })
    notificationService.save(data, (err, result) => { return result });
}

module.exports = {
    addNotification
}