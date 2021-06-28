const { Schema, model, Types } = require("mongoose");
const moment = require('moment');

const ReactionSchema = new Schema
(
	{
		reactionId: {
			type: Schema.Types.ObjectId,
			default: () => new Types.ObjectId()
		},
		reactionBody: {
			type: String,
			required: [true, 'reactionBody within the request is required with a reaction'],
			maxlength: 280
		},
		username: {
			type: String,
			required: [true, 'username within the request is required with a reaction']
		},
		userId: {
			type: String,
			required: 'userId is required within this request'
		},
		createdAt: {
			type: Date,
			default: Date.now,
			get: createdAtVal => moment(createdAtVal).format('MMM DD YYYY [at] hh:mm a')
		}
	},
	{
		toJSON: {
		getters: true
		},
		id: false
	}
)

const ThoughtSchema = new Schema
(
	{
		thoughtText: {
			type: String,
			required: [true, 'thoughtText is required in this request'],
			minlength: 1,
			maxlength: 280
		},
		createdAt: {
			type: Date,
			default: Date.now,
			get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
		},
		reactions: [ReactionSchema],
		username: {
			type: String,
			required: 'A username is required for this thought creation'
		},
		userId: {
			type: String,
			required: [true, 'userId is required for this thought creation']
		}
	},
	{
		toJSON: {
			virtuals: true,
			getters: true
		},
		id: false
	}
);


ThoughtSchema.virtual('reactionCount')
.get(function() {
    return this.reactions.length;
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;