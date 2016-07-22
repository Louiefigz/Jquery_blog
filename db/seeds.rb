# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


one = User.create(email: "one@gmail.com", password: "12345678")
two = User.create(email: "two@gmail.com", password: "12345678")
three = User.create(email: "three@gmail.com", password: "12345678")

post-one = Post.create(name: "first post ever", content: "This is the first post ever made", user_id: one.id)
post-two = Post.create(name: "Shepards pie", content: "Grandma is the best", user_id: two.id)
post-three = Post.create(name: "winning the championship", content: "It ain't easy man. Forget what they told you.", user_id: three.id)
