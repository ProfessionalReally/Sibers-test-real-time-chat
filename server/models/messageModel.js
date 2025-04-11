const mongoose = require('mongoose/lib');

const messageSchema = mongoose.Schema({
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        content: {
            type: String,
            trim: true,
        },
        chat: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Chat',
        },
        readBy: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }],
    },
    {timestamps: true}
);

const Message = mongoose.model('Chat', messageSchema);

module.exports = Message;