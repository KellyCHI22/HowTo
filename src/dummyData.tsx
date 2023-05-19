export type Post = {
  id: string;
  createdAt: number;
  title: string;
  introduction: string;
  tags: string[];
  authorId: string;
  image: string;
  commentsCount: number;
  likesCount: number;
  steps: {
    id: string;
    description: string;
  }[];
};

export type User = {
  id: string;
  createdAt: number;
  name: string;
  email: string;
  bio: string;
  avatar: string;
  cover_image: string;
  followers: string[];
  following: string[];
  likedPosts: string[];
  bookmarkedPosts: string[];
};

export type Comment = {
  id: string;
  createdAt: number;
  commentContent: string;
  postId: string;
  userId: string;
};

export const posts: Post[] = [
  {
    id: 'post_id_1',
    createdAt: 1683361474000,
    title: 'How to turn your cat into a DJ',
    introduction:
      'Are you tired of your cat just lazing around all day? Learn how to turn your cat into a DJ with turntables, a collar, and some training. Upload videos to social media and become internet famous!',
    tags: ['cat', 'music', 'animal'],
    authorId: 'user_id_1',
    image:
      'https://firebasestorage.googleapis.com/v0/b/howto-creative.appspot.com/o/cat_dj.jpg?alt=media&token=72dfe8e3-f90e-4e85-8344-777997c73db4',
    commentsCount: 0,
    likesCount: 0,
    steps: [
      {
        id: 'step-001',
        description: 'Buy a set of DJ turntables and a mixer.',
      },
      {
        id: 'step-002',
        description:
          'Train your cat to respond to certain sounds or commands. ',
      },
      {
        id: 'step-003',
        description:
          'Attach a special collar with sensors that can trigger the turntables and mixer.',
      },
      {
        id: 'step-004',
        description: 'Play music and watch your cat scratch and mix the beats.',
      },
      {
        id: 'step-005',
        description:
          'Upload the videos to social media and become internet famous.',
      },
    ],
  },
  {
    id: 'post_id_2',
    createdAt: 1684312013000,
    title: 'How to Turn Your Car into a Spaceship',
    introduction:
      "Are you tired of the ordinary? Transform your car into a high-flying spaceship! With some cardboard, foil, and paint, you'll be cruising through the galaxy in no time.",
    tags: ['car', 'spaceship', 'space'],
    authorId: 'user_id_2',
    image:
      'https://firebasestorage.googleapis.com/v0/b/howto-creative.appspot.com/o/spacecar.jpg?alt=media&token=a09a6149-362b-4e10-991e-f38b7e5c6cc1',
    commentsCount: 0,
    likesCount: 0,
    steps: [
      {
        id: 'step-001',
        description:
          'Gather materials such as cardboard, foil, and spray paint.',
      },
      {
        id: 'step-002',
        description:
          'Cover your car in cardboard and secure it with duct tape.',
      },
      {
        id: 'step-003',
        description:
          'Use foil to create spaceship-like features such as wings and antennas.',
      },
      {
        id: 'step-004',
        description: 'Spray paint the entire car in a metallic color.',
      },
      {
        id: 'step-005',
        description:
          'Blast off into space (or just drive around town and enjoy the confused looks from other drivers).',
      },
    ],
  },
  {
    id: 'post_id_3',
    createdAt: 1684225613000,
    title: 'How to Turn Your Hair into a Plant',
    introduction:
      "Unleash your inner green thumb and transform your hair into a living plant! With soil, seeds, and a little creativity, you'll have a head full of botanical beauty in no time.",
    tags: ['hair', 'plant', 'daily life'],
    authorId: 'user_id_3',
    image:
      'https://firebasestorage.googleapis.com/v0/b/howto-creative.appspot.com/o/hair_plant.jpg?alt=media&token=01d3035b-0aeb-44ac-9241-4d85d3c7bd3f',
    commentsCount: 0,
    likesCount: 0,
    steps: [
      {
        id: 'step-001',
        description: 'Gather materials such as soil, seeds, and hair dye.',
      },
      {
        id: 'step-002',
        description: 'Mix the soil and seeds together in a bowl.',
      },
      {
        id: 'step-003',
        description:
          'Apply the mixture to your hair, making sure to cover all strands.',
      },
      {
        id: 'step-004',
        description:
          'Add a few drops of hair dye to the mixture for color (optional).',
      },
      {
        id: 'step-005',
        description:
          'Water your hair daily and watch as it sprouts into a beautiful plant.',
      },
    ],
  },
  {
    id: 'post_id_4',
    createdAt: 1681633613000,
    title: 'How to Turn Your Fridge into a Time Machine',
    introduction:
      'Imagine the possibilities of time travel right in your kitchen! Transform your ordinary fridge into a magnificent time machine and embark on incredible journeys through the ages.',
    tags: ['fridge', 'time machine', 'cool'],
    authorId: 'user_id_4',
    image:
      'https://firebasestorage.googleapis.com/v0/b/howto-creative.appspot.com/o/fridge_time_machine.jpg?alt=media&token=3dc55deb-f064-41c5-9f16-b217d176dc49',
    commentsCount: 0,
    likesCount: 0,
    steps: [
      {
        id: 'step-001',
        description: 'Empty your fridge.',
      },
      {
        id: 'step-002',
        description: 'Cover the fridge in aluminum foil.',
      },
      {
        id: 'step-003',
        description: 'Add buttons and dials made from cardboard and markers.',
      },
      {
        id: 'step-004',
        description: 'Create a vortex inside the fridge using a small fan.',
      },
      {
        id: 'step-005',
        description:
          "Step inside and travel through time to your favorite era. Don't forget your snacks for the trip!",
      },
    ],
  },
  {
    id: 'post_id_5',
    createdAt: 1678955213000,
    title: 'How to Make a Robot Bartender',
    introduction:
      'Say goodbye to boring bartending and hello to your very own robot mixologist! Learn how to create a futuristic robot bartender that will impress your guests and mix the perfect drinks every time.',
    tags: ['robot', 'bartender', 'funny'],
    authorId: 'user_id_5',
    image:
      'https://firebasestorage.googleapis.com/v0/b/howto-creative.appspot.com/o/robot_bartender.jpg?alt=media&token=9f2b204c-4b94-4f12-8cbe-be5828e1f50e',
    commentsCount: 0,
    likesCount: 0,
    steps: [
      {
        id: 'step-001',
        description:
          'Collect the necessary materials, including a robotic arm, a dispensing system, and a touch screen interface.',
      },
      {
        id: 'step-002',
        description: 'Install and test the robotic arm and dispensing system.',
      },
      {
        id: 'step-003',
        description:
          'Program the touch screen interface to allow users to select their drinks.',
      },
      {
        id: 'step-004',
        description:
          'Install sensors to detect the presence of a glass and measure the amount of liquid dispensed.',
      },
      {
        id: 'step-005',
        description:
          'Invite your friends over for a party and let the robot bartender do the work.',
      },
    ],
  },
  {
    id: 'post_id_6',
    createdAt: 1651662395000,
    title: 'How to Train Your Goldfish to Do Tricks',
    introduction:
      'Unleash the hidden talents of your goldfish with these simple tricks! Follow these steps to train your goldfish to perform impressive tricks and become the star of your aquarium.',
    tags: ['goldfish', 'tricks', 'animal'],
    authorId: 'user_id_1',
    image:
      'https://firebasestorage.googleapis.com/v0/b/howto-creative.appspot.com/o/goldfish.jpg?alt=media&token=ad6f80b6-22c8-482b-a11d-f7ea5e79611d',
    commentsCount: 0,
    likesCount: 0,
    steps: [
      {
        id: 'step-001',
        description: 'Choose a small, shallow tank for your goldfish.',
      },
      {
        id: 'step-002',
        description:
          'Use treats, like small flakes of food, to teach your goldfish to perform tricks, like jumping through a hoop.',
      },
      {
        id: 'step-003',
        description:
          'Train your goldfish in short, frequent sessions and be patient.',
      },
      {
        id: 'step-004',
        description:
          'Add some obstacles to your tank, like tunnels or hoops, to make the training more challenging.',
      },
      {
        id: 'step-005',
        description:
          'Show off your talented goldfish to your friends and family.',
      },
    ],
  },
  {
    id: 'post_id_7',
    createdAt: 1651662405000,
    title: 'How to Teach Your Dog to Paint',
    introduction:
      "Unlock your dog's inner artist with this fun and creative activity! Follow these steps to teach your dog how to paint and create unique pieces of art together.",
    tags: ['dog', 'painting', 'animal'],
    authorId: 'user_id_6',
    image:
      'https://firebasestorage.googleapis.com/v0/b/howto-creative.appspot.com/o/dog_painter.jpg?alt=media&token=cc426f2e-fd5a-43f1-b392-e5910f450df6',
    commentsCount: 0,
    likesCount: 0,
    steps: [
      {
        id: 'step-001',
        description:
          'Set up a canvas and paint supplies in a dog-friendly space.',
      },
      {
        id: 'step-002',
        description:
          'Encourage your dog to walk on the canvas and explore the paint.',
      },
      {
        id: 'step-003',
        description:
          'Use treats and positive reinforcement to reward your dog for painting.',
      },
      {
        id: 'step-004',
        description:
          'Experiment with different colors and brush types to see what your dog likes best.',
      },
      {
        id: 'step-005',
        description:
          "Frame your dog's masterpieces and display them proudly in your home.",
      },
    ],
  },
  {
    id: 'post_id_8',
    createdAt: 1684304873000,
    title: 'How to Make a Wearable Cheese Hat',
    introduction:
      'Learn the art of transforming ordinary blocks of cheese into a remarkable fashion statement - a wearable cheese hat! Be the center of attention as you don this cheesy masterpiece.',
    tags: ['cheese', 'hat', 'funny'],
    authorId: 'user_id_2',
    image:
      'https://firebasestorage.googleapis.com/v0/b/howto-creative.appspot.com/o/cheese_hat.jpg?alt=media&token=72561a29-ae26-4785-83fc-4c951bdfcd19',
    commentsCount: 0,
    likesCount: 0,
    steps: [
      {
        id: 'step-001',
        description: 'Purchase several blocks of cheese.',
      },
      {
        id: 'step-002',
        description: 'Cut the cheese into thin slices.',
      },
      {
        id: 'step-003',
        description: 'Arrange the slices into a hat shape.',
      },
      {
        id: 'step-004',
        description: 'Allow the cheese to dry and harden.',
      },
      {
        id: 'step-005',
        description:
          'Wear your cheesy creation to the next party and watch as everyone drools with envy.',
      },
    ],
  },
  {
    id: 'post_id_9',
    createdAt: 1684391273000,
    title: 'How to Start a Garden on Mars',
    introduction:
      'Embark on an interplanetary gardening adventure, building a Martian greenhouse, creating soil substitute, and simulating Earth-like conditions. Harvest Martian produce and become a space farmer.',
    tags: ['garden', 'Mars', 'space'],
    authorId: 'user_id_1',
    image:
      'https://firebasestorage.googleapis.com/v0/b/howto-creative.appspot.com/o/garden_mars.jpg?alt=media&token=fedc9000-0bbf-48c3-a21d-c929f2b886bf',
    commentsCount: 0,
    likesCount: 0,
    steps: [
      {
        id: 'step-001',
        description: 'Build a greenhouse and transport it to Mars.',
      },
      {
        id: 'step-002',
        description:
          'Create a Martian soil substitute that can support plant growth.',
      },
      {
        id: 'step-003',
        description:
          'Choose the right seeds for your Martian garden, such as potatoes or lettuce.',
      },
      {
        id: 'step-004',
        description:
          'Use artificial lighting and temperature control to simulate Earth-like conditions.',
      },
      {
        id: 'step-005',
        description:
          'Harvest your Martian produce and become the first interplanetary farmer.',
      },
    ],
  },
  {
    id: 'post_id_10',
    createdAt: 1684391273000,
    title: 'How to Train Your Frog to Be a Ninja',
    introduction:
      "Tap into your frog's hidden ninja abilities with a customized dojo, stealth training, agility exercises, weapon mastery, and an epic obstacle course. Prepare to be amazed!",
    tags: ['frog', 'ninja', 'funny', 'animal'],
    authorId: 'user_id_4',
    image:
      'https://firebasestorage.googleapis.com/v0/b/howto-creative.appspot.com/o/frog_ninja.jpg?alt=media&token=06d1ad96-65c6-46f3-8ddb-cdd6ce1dc6ab',
    commentsCount: 0,
    likesCount: 0,
    steps: [
      {
        id: 'step-001',
        description:
          'Build a miniature ninja dojo for your frog, complete with tiny weapons and obstacles.',
      },
      {
        id: 'step-002',
        description:
          'Teach your frog the art of stealth by hiding treats and toys around the dojo for them to find.',
      },
      {
        id: 'step-003',
        description:
          'Train your frog to jump and climb over obstacles using agility exercises.',
      },
      {
        id: 'step-004',
        description:
          'Teach your frog how to use miniature weapons such as tiny ninja stars and swords.',
      },
      {
        id: 'step-005',
        description:
          'Set up an obstacle course for your frog to practice their skills, and reward them with tasty treats.',
      },
      {
        id: 'step-006',
        description:
          'Watch as your frog becomes a master of ninja skills, and show off their skills to your friends and family.',
      },
    ],
  },
];

export const users: User[] = [
  {
    id: 'user_id_1',
    createdAt: 1651662365000,
    name: 'Betty Liang',
    email: 'betty.liang@example.com',
    bio: 'Traveling the world one destination at a time. Passionate about experiencing new cultures and making unforgettable memories.',
    avatar:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80',
    cover_image: 'https://picsum.photos/id/913/800/500',
    followers: ['user_id_2', 'user_id_3', 'user_id_5'],
    following: ['user_id_2', 'user_id_3'],
    likedPosts: ['post_id_1', 'post_id_2'],
    bookmarkedPosts: ['post_id_3', 'post_id_4'],
  },
  {
    id: 'user_id_2',
    createdAt: 1651662365000,
    name: 'Thomas Herring',
    email: 'thomas.herring@example.com',
    bio: 'Lover of all things coffee, books, and travel. Constantly searching for the best cup of joe and the next adventure.',
    avatar:
      'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80',
    cover_image: 'https://picsum.photos/id/800/800/500',
    followers: ['user_id_1', 'user_id_3'],
    following: ['user_id_1', 'user_id_3'],
    likedPosts: ['post_id_1', 'post_id_2'],
    bookmarkedPosts: ['post_id_3', 'post_id_4'],
  },
  {
    id: 'user_id_3',
    createdAt: 1651662365000,
    name: 'Martha Joyner',
    email: 'martha.joyner@example.com',
    bio: 'Passionate home cook and food blogger. Sharing recipes and kitchen tips to help you create delicious meals.',
    avatar:
      'https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    cover_image: 'https://picsum.photos/id/835/800/500',
    followers: ['user_id_2', 'user_id_1'],
    following: ['user_id_2', 'user_id_1'],
    likedPosts: ['post_id_1', 'post_id_2'],
    bookmarkedPosts: ['post_id_3', 'post_id_4'],
  },
  {
    id: 'user_id_4',
    createdAt: 1651662365000,
    name: 'Emily Wang',
    email: 'betty.liang@example.com',
    bio: ' Always up for a movie night. Rom-coms are my guilty pleasure. Critiques films with friends. Netflix binges are my thing.',
    avatar:
      'https://images.unsplash.com/photo-1548142813-c348350df52b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=689&q=80',
    cover_image: 'https://picsum.photos/id/861/800/500',
    followers: ['user_id_3', 'user_id_1'],
    following: ['user_id_2', 'user_id_1'],
    likedPosts: ['post_id_1', 'post_id_2'],
    bookmarkedPosts: ['post_id_3', 'post_id_4'],
  },
  {
    id: 'user_id_5',
    createdAt: 1651662365000,
    name: 'Jennifer Rodriquez',
    email: 'jennifer.rodriquez@example.com',
    bio: ' Always dreaming of salty air and sandy toes. Sea enthusiast, lover of all things coastal.',
    avatar:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    cover_image: 'https://picsum.photos/id/867/800/500',
    followers: ['user_id_4', 'user_id_1'],
    following: ['user_id_4', 'user_id_1'],
    likedPosts: ['post_id_1', 'post_id_2'],
    bookmarkedPosts: ['post_id_3', 'post_id_4'],
  },
  {
    id: 'user_id_6',
    createdAt: 1651662365000,
    name: 'John Doe',
    email: 'john.doe@example.com',
    bio: "I'm a software engineer and a foodie!",
    avatar:
      'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    cover_image: 'https://picsum.photos/id/806/800/500',
    followers: ['user_id_2', 'user_id_3'],
    following: ['user_id_3', 'user_id_4'],
    likedPosts: ['post_id_1', 'post_id_2'],
    bookmarkedPosts: ['post_id_3', 'post_id_4'],
  },
];

export const comments: Comment[] = [
  {
    id: 'comment_id_1',
    createdAt: 1684380473000,
    commentContent: 'Great post!',
    postId: 'post_id_2',
    userId: 'user_id_4',
  },
  {
    id: 'comment_id_2',
    createdAt: 1684380473000,
    commentContent: 'Hilarious!',
    postId: 'post_id_3',
    userId: 'user_id_2',
  },
  {
    id: 'comment_id_3',
    createdAt: 1684380473000,
    commentContent: 'I tried this and it worked!',
    postId: 'post_id_3',
    userId: 'user_id_1',
  },
  {
    id: 'comment_id_4',
    createdAt: 1684380473000,
    commentContent: 'This made my day!',
    postId: 'post_id_1',
    userId: 'user_id_5',
  },
  {
    id: 'comment_id_5',
    createdAt: 1684380473000,
    commentContent: "I can't wait to try this!",
    postId: 'post_id_2',
    userId: 'user_id_1',
  },
  {
    id: 'comment_id_6',
    createdAt: 1684380473000,
    commentContent: 'My cat is ready to be a DJ now!',
    postId: 'post_id_1',
    userId: 'user_id_3',
  },
  {
    id: 'comment_id_7',
    createdAt: 1684380473000,
    commentContent: 'Best idea ever!',
    postId: 'post_id_3',
    userId: 'user_id_1',
  },
  {
    id: 'comment_id_8',
    createdAt: 1684380473000,
    commentContent: 'I laughed so hard!',
    postId: 'post_id_1',
    userId: 'user_id_4',
  },
  {
    id: 'comment_id_9',
    createdAt: 1684391273000,
    commentContent: 'I never thought of this. Brilliant!',
    postId: 'post_id_2',
    userId: 'user_id_5',
  },
  {
    id: 'comment_id_10',
    createdAt: 1684391273000,
    commentContent: "I can't stop watching these cat DJ videos!",
    postId: 'post_id_1',
    userId: 'user_id_2',
  },
  {
    id: 'comment_id_11',
    createdAt: 1684391273000,
    commentContent: "I'm throwing a cat DJ party, who's in?",
    postId: 'post_id_1',
    userId: 'user_id_3',
  },
  {
    id: 'comment_id_12',
    createdAt: 1684391273000,
    commentContent: 'I tried this and ended up in the Ice Age!',
    postId: 'post_id_4',
    userId: 'user_id_1',
  },
  {
    id: 'comment_id_13',
    createdAt: 1684391273000,
    commentContent: "My fridge time machine is stuck on the '70s!",
    postId: 'post_id_4',
    userId: 'user_id_3',
  },
  {
    id: 'comment_id_14',
    createdAt: 1684391273000,
    commentContent: 'I used my fridge time machine to skip Monday mornings!',
    postId: 'post_id_4',
    userId: 'user_id_2',
  },
  {
    id: 'comment_id_15',
    createdAt: 1684391273000,
    commentContent: 'Very cool',
    postId: 'post_id_5',
    userId: 'user_id_3',
  },
];

export const currentUser: User = {
  id: 'user_id_1',
  createdAt: 1651662365000,
  name: 'Betty Liang',
  email: 'betty.liang@example.com',
  bio: 'Traveling the world one destination at a time. Passionate about experiencing new cultures and making unforgettable memories.',
  avatar:
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80',
  cover_image: 'https://picsum.photos/id/913/800/500',
  followers: ['user_id_2', 'user_id_3', 'user_id_5'],
  following: ['user_id_2', 'user_id_3'],
  likedPosts: ['post_id_1', 'post_id_2'],
  bookmarkedPosts: ['post_id_3', 'post_id_4', 'post_id_7', 'post_id_10'],
};
