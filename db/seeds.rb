# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


@one = User.create(email: "one@gmail.com", password: "12345678")
@two = User.create(email: "two@gmail.com", password: "12345678")
@three = User.create(email: "three@gmail.com", password: "12345678")

@post_one = Post.create(name: "first post ever", content: "This is the first post ever made", user_id: @one.id)
@post_two = Post.create(name: "Shepards pie", content: "Grandma is the best", user_id: @two.id)
@post_three = Post.create(name: "winning the championship", content: "It ain't easy man. Forget what they told you.", user_id: @three.id)


@tag_one = Tag.create(name: "Humor")
@tag_two = Tag.create(name: "Education")
@tag_three = Tag.create(name: "Topical")
@tag_four = Tag.create(name: "Rant")


@post_one.tags << [@tag_one, @tag_two]
@post_two.tags << [@tag_three, @tag_four]
@post_three.tags << [@tag_one, @tag_four, @tag_three]
